var express       = require("express"),
  Comment         = require("../models/comment"),
  Campground      = require("../models/campground"),
  router          = express.Router({mergeParams:true});

// NEW - Display form to make a new comment
router.get("/new", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCamp) {
    if (err) {
      console.log(err);
    } else {
      res.render("comment/new", {
        camp: foundCamp
      })
    }
  })
})

// CREATE - Add a new comment in the db
router.post("/", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save()
          campground.comments.push(comment)
          campground.save()
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  })
})

// middleware to autheticate the user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

module.exports  =router
