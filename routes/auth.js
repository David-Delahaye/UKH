const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const pool = require("../config/db");

//----------------POSTS
router.get("/api/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: {type: 'success', content:'Successfully Logged Out'} });
});

router.get("/api/user", (req, res) => {
  const username = req.user ? req.user.username : "guest";
  res.status(200).json({ username: username });
});

router.get("/api/user/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const response = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user]
    );
    console.log(response.rows[0]);
    res.json({ username: response.rows[0].username });
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/api/register", (req, res, next) => {
  const saltHash = genPassword(req.body.password);

  const username = req.body.username;
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  pool.query("INSERT INTO users (username, hash, salt) VALUES($1,$2,$3)", [
    username,
    hash,
    salt,
  ]);
  res.status(200).json({ message: {type: 'success', content:'Successfully registered'} });
});

router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: req.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({ username: user.username, message: req.message });
      }
    });
  })(req,res,next);
});

module.exports = router;
