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

// CREATE - Add a new campground
router.post("/", function(req,res){
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCamp = {
    name: name,
    image: image,
    description: desc
  }
  Campground.create(newCamp,function(err,camp){
    if(err){
      console.log(err);
    }else {
      res.redirect("/campgrounds")
    }
  })

})

// NEW - Display form to make a new campground
router.get("/new",function(req,res){
  res.render("campground/new")
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

module.exports = router
