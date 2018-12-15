var express               = require("express"),
    passport              = require("passport"),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    passportLocal         = require("passport-local"),
    expressSession        = require("express-session"),
    passportLocalMongoose = require("passport-local-mongoose"),
    app                   = express();

//Modoles
var SeedDB      = require("./seeds"),
    User      = require("./models/user"),
    Comment    = require("./models/comment"),
    Campground  = require("./models/campground");


mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true});
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
SeedDB();

//=================
// PASSPORT CONFIG
//=================
app.use(expressSession({
  secret:"Elie Bizimana",
  resave: false,
  saveUninitialized:false
}));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//=================
// CAMPPGROUND ROUTES
//==================
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
// COMMENTS ROUTES
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

app.post("/campgrounds/:id/comment",function(req,res){
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds")
    }else{
      Comment.create(req.body.comment,function(err,comment){
        if(err){
          console.log(err);
        }else{
          campground.comments.push(comment)
          campground.save()
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  })
})

//=============
// AUTH ROUTES
//=============
app.get("/register",function(req,res){
  res.render("register")
})
app.post("/register",function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err,user){
    if(err){
      console.log(err);
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds")
    })
  })
})

app.listen(3000, function(){
  console.log("Server Has Started....");
})
