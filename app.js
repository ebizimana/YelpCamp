var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var camps = [
  {name: "Acorn Oaks", image: "https://www.acornoakscampground.net/wp-content/uploads/wppa/53.jpg?ver=1"},
  {name: "Beaver Point", image: "https://api.campgroundbooking.com/api/v1/property/5a39f83dd9c7ef48b9a3b98b/image/Beaver-Point-Resort---Cottages-3e33c50c5056a36_3e33c702-5056-a36a-0a20ccc01a08f6ff_600_thumb.jpg"},
  {name: "Bixler Lake", image: "https://media-cdn.tripadvisor.com/media/photo-s/0a/f3/0c/ca/changing-areas.jpg"},
  {name: "Acorn Oaks", image: "https://www.acornoakscampground.net/wp-content/uploads/wppa/53.jpg?ver=1"},
  {name: "Beaver Point", image: "https://api.campgroundbooking.com/api/v1/property/5a39f83dd9c7ef48b9a3b98b/image/Beaver-Point-Resort---Cottages-3e33c50c5056a36_3e33c702-5056-a36a-0a20ccc01a08f6ff_600_thumb.jpg"},
  {name: "Acorn Oaks", image: "https://www.acornoakscampground.net/wp-content/uploads/wppa/53.jpg?ver=1"},
  {name: "Beaver Point", image: "https://api.campgroundbooking.com/api/v1/property/5a39f83dd9c7ef48b9a3b98b/image/Beaver-Point-Resort---Cottages-3e33c50c5056a36_3e33c702-5056-a36a-0a20ccc01a08f6ff_600_thumb.jpg"},
  {name: "Acorn Oaks", image: "https://www.acornoakscampground.net/wp-content/uploads/wppa/53.jpg?ver=1"}
]

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")

app.get("/", function(req,res){
  res.render("home")
})
app.get("/campgrounds",function(req,res){
  res.render("campgrounds",{camps:camps})
})
app.post("/campgrounds", function(req,res){
  var name = req.body.name
  var image = req.body.image
  var newCamp = {name: name, image: image}
  camps.push(newCamp)
  res.redirect("/campgrounds")
})
app.get("/campgrounds/new",function(req,res){
  res.render("new")
})

app.listen(3000, function(){
  console.log("Server Has Started....");
})
