const TmdbCache = require("../models/TmdbCache");

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function proxyTmdb(req, res) {
    try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "TMDB API key is not configured"
            });
        }

        const endpoint = req.path.replace(/^\/+/, "");

        // Avoid path traversal and malformed endpoints.
        if (!endpoint || endpoint.includes("..")) {
            return res.status(400).json({ error: "Invalid TMDB endpoint" });
        }

        // Never trust an API key supplied by the client.
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(req.query)) {
            if (key === "api_key") continue;

            if (Array.isArray(value)) {
                value.forEach(v => params.append(key, String(v)));
            } else if (value != null) {
                params.set(key, String(value));
            }
        }

        const cacheKey = `${endpoint}?${params.toString()}`;

        const cached = await TmdbCache.findOne({ cacheKey });

        if (cached && cached.expiresAt > new Date()) {
            res.set("X-Cache", "HIT");
            return res.json(cached.data);
        }

        params.set("api_key", apiKey);

        const url = new URL(
            `https://api.themoviedb.org/3/${endpoint}`
        );
        url.search = params.toString();

        let response;

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                response = await fetch(url, {
                    signal: AbortSignal.timeout(10000)
                });
                break;
            } catch (error) {
                if (attempt === 3) throw error;
                await new Promise(resolve => setTimeout(resolve, 500 * attempt));
            }
        }

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        const expiresAt = new Date(Date.now() + CACHE_TTL_MS);

        await TmdbCache.findOneAndUpdate(
            { cacheKey },
            { cacheKey, data, expiresAt },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.set("X-Cache", "MISS");
        return res.json(data);
    } catch (error) {
        console.error("TMDB request failed:", error.message);
        return res.status(502).json({
            error: "Failed to retrieve data from TMDB"
        });
    }
}

module.exports = { proxyTmdb };
