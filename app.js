var bodyParser   = require("body-parser"),
    express      = require("express"),
    mongoose     = require("mongoose"),
    app          = express();

//Modoles
var Campground  = require("./models/campground"),
    SeedDB      = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
SeedDB();

// Routes
app.get("/", function(req,res){
  res.render("home")
})

// INDEX - show all campgrounds
app.get("/campgrounds",function(req,res){
  Campground.find({},function(err, allcamps){
    if(err){
      console.log(err);
    } else{
      console.log(allcamps);
      res.render("campground/index",{camps:allcamps})
    }
  })

})

// CREATE - Add a new campground
app.post("/campgrounds", function(req,res){
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
app.get("/campgrounds/new",function(req,res){
  res.render("campground/new")
})

// SHOW - Shows ingo avout one campground
app.get("/campgrounds/:id",function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
    if(err){
      console.log(err);
    }else{
       res.render("campground/show",{camp:foundCamp})
    }
  })
})

//======================
// Comments Routes
//======================

app.get("/campgrounds/:id/comment/new",function(req,res){
  Campground.findById(req.params.id,function(err,foundCamp){
    if(err){
      console.log(err);
    }else {
      res.render("comment/new",{camp:foundCamp})
    }
  })
})

app.listen(3000, function(){
  console.log("Server Has Started....");
})
