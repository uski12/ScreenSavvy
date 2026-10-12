const router = require("express").Router();
const { proxyTmdb } = require("../controllers/TmdbController");

router.get("*", proxyTmdb);

module.exports = router;
