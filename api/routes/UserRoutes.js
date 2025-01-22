const router = require("express").Router();
const { addToWatchedList, getWatchedList, removeFromWatchedList, signUp, login, deleteAccount } = require("../controllers/UserController")


router.put("/add", addToWatchedList);
router.get("/get", getWatchedList);
router.delete("/remove", removeFromWatchedList);
router.delete("/delete", deleteAccount);
router.post("/signup", signUp);
router.get("/login", login);



module.exports = router;


