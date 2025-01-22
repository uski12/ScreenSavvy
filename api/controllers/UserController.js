const User = require("../models/UserModel");

module.exports.addToWatchedList = async (req, res) => {
    try {
        const { email, id, type } = req.body;
        const user = await User.findOne({ email });

        console.log(email, id, type);
        if(user) {
            const { watchedList } = user;

            const alreadyWatched = watchedList.some(item =>
                item.id === id && item.type === type
            );

            if(!alreadyWatched) {
                await User.findOneAndUpdate({ email: email }, { $push: { watchedList: { id: id, type: type } } });
                return res.json({msg: "Movied added."});
            } else return res.json({msg: "Movie already watched"});
        } else await User.create({email, watchedList:[data]});


    } catch (error) {
        return res.json({msg: "Error adding movie"});
    }
};

module.exports.getWatchedList = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email: email });
        console.log(user);
        return res.json({ msg: "Success getting list", arr: user.watchedList });

    } catch (error) {
        return res.json({msg: "Error getting movie"});
    }
}


module.exports.removeFromWatchedList = async (req, res) => {
    try {
        const { email, id, type } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.json({ msg: "Error: user not found" });
        }

        const { watchedList } = user;

        const alreadyWatched = watchedList.some(item =>
            item.id === id && item.type === type
        );


        if(alreadyWatched) {
            await User.findOneAndUpdate({ email: email }, { $pull: { watchedList: { id: id, type: type } } } );
            return res.json({ msg: "Successfully removed." });
        }

    } catch (error) {
        return res.json({ msg: "Error removing movie" });
    }
}



module.exports.signUp = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({ email });

        if(user) {
            return res.json({ msg: "Email is already taken!" });
        }

        const data = {
            name: name,
            email: email,
            password: password,
            watchedList: [],
        };
        console.log(data);
        await User.create(data);
        return res.json({ msg: "User created" });

    } catch (error) {
        return res.json({ msg: "Error signing up" });
    }


};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.query;
        console.log(res.query);
        const user = await User.findOne({ email: email });


        if (user) {
            if (password == user.password) {
                return res.json({ msg: "Success: logged in.", data: { user: user.name }, token: 1});
            } else return res.json({ msg: "Error: password wrong" });
        } else return res.json({ msg: "Error: user not found", token: "" });



    } catch (error) {
        return res.json({ msg: "Error: unable to log in." });
    }

}

module.exports.deleteAccount = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        console.log(email);

        if (user) {
            await User.deleteOne({ email });
            return res.json({ msg: "Successfully deleted"});
            } else return res.json({ msg: "Error: unable to delete" });

    } catch (error) {
        return res.json({ msg: "Error: unable to delete." });
    }

}
