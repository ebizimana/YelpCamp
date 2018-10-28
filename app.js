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
  image: String
});

var Campground = mongoose.model("Campground",campgroundSchema)

app.get("/", function(req,res){
  res.render("home")
})

app.get("/campgrounds",function(req,res){
  Campground.find({},function(err, allcamps){
    if(err){
      console.log(err);
    } else{
      console.log(allcamps);
    }
    res.render("campgrounds",{camps:allcamps})
  })

})
app.post("/campgrounds", function(req,res){
  var name = req.body.name
  var image = req.body.image
  var newCamp = {name: name, image: image}
  Campground.create(newCamp,function(err,camp){
    if(err){
      console.log(err);
    }else {
      res.redirect("/campgrounds")
    }
  })

})
app.get("/campgrounds/new",function(req,res){
  res.render("new")
})

app.listen(3000, function(){
  console.log("Server Has Started....");
})
