var express = require("express"),
  router = express.Router(),
  middleware = require("../middleware"),
  Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", function(req, res) {
  Campground.find({}, function(err, allcamps) {
    if (err) {
      console.log(err);
    } else {
      res.render("campground/index", { camps: allcamps });
    }
  });
});

// NEW - Display form to make a new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campground/new");
});

// CREATE - Add a new campground
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.name,
    price = req.body.price,
    image = req.body.image,
    desc = req.body.description,
    author = {
      id: req.user._id,
      username: req.user.username
    };

  var newCamp = {
    name: name,
    price: price,
    image: image,
    description: desc,
    author: author
  };
  Campground.create(newCamp, function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// SHOW - Shows info about one campground
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCamp) {
      if (err) {
        console.log(err);
      } else {
        res.render("campground/show", { camp: foundCamp });
      }
    });
});

// Edit - Edits the campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(
  req,
  res
) {
  Campground.findById(req.params.id, function(err, foundCamp) {
    res.render("campground/edit", { camp: foundCamp });
  });
});

//Update - Updates a specific campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    camp
  ) {
    res.redirect("/campgrounds/" + req.params.id);
  });
});

//Delete Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndDelete(req.params.id, function(err) {
    res.redirect("/campgrounds");
  });
});

module.exports = router;
