var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground",campgroundSchema)

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
    }
    res.render("index",{camps:allcamps})
  })

})

// CREATE - Add a new campground
app.post("/campgrounds", function(req,res){
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCamp = {name: name, image: image, description: desc}
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
  res.render("new")
})

// SHOW - Shows ingo avout one campground
app.get("/campgrounds/:id",function(req,res){
  Campground.findById(req.params.id,function(err,foundCamp){
    res.render("show",{camp:foundCamp})
  })

})
app.listen(3000, function(){
  console.log("Server Has Started....");
})
