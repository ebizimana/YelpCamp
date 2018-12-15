var express     = require("express"),
  router        = express.Router(),
  passport      = require("passport"),
  User          = require("../models/user");

// Home route
router.get("/", function(req, res) {
  res.render("home")
})

//SignUp form
router.get("/register", function(req, res) {
  res.render("register")
})

// Add the user info to the database
router.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds")
    })
  })
})

// LogIn form
router.get("/login", function(req, res) {
  res.render("login")
})

// Authenticate the user from db
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}))

//Logout
router.get("/logout", function(req, res) {
  req.logout()
  res.redirect("/campgrounds")
})

module.exports = router
