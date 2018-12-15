var express       = require("express"),
    router        = express.Router(),
    Campground    = require("../models/campground")

// INDEX - show all campgrounds
router.get("/",function(req,res){
  Campground.find({},function(err, allcamps){
    if(err){
      console.log(err);
    } else{
      res.render("campground/index",{camps:allcamps})
    }
  })

})

// NEW - Display form to make a new campground
router.get("/new",isLoggedIn, function(req,res){
  res.render("campground/new")
})

// CREATE - Add a new campground
router.post("/", isLoggedIn, function(req,res){
  var name = req.body.name,
      image = req.body.image,
      desc = req.body.description,
      author = {
        id: req.user._id,
        username: req.user.username
      };

  var newCamp = {
    name: name,
    image: image,
    description: desc,
    author: author
  }
  Campground.create(newCamp,function(err,camp){
    if(err){
      console.log(err);
    }else {
      res.redirect("/campgrounds")
    }
  })

})
// SHOW - Shows info about one campground
router.get("/:id",function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
    if(err){
      console.log(err);
    }else{
       res.render("campground/show",{camp:foundCamp})
    }
  })
})

// Edit - Edits the campground
router.get("/:id/edit",function(req,res){
  Campground.findById(req.params.id, function(err,foundCamp){
    if(err){
      console.log(err);
      res.redirect("/campgrounds")
    }else {
      res.render("campground/edit",{camp:foundCamp})
    }
  })
})

//Update - Updates a specific campground
router.put("/:id",function(req,res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,camp){
    if(err){
      console.log(err);
      res.redirect("/campgrounds")
    } else{
      res.redirect("/campgrounds/" + req.params.id)
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

module.exports = router
