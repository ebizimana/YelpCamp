//PACKAGES SETUP
var express               = require("express"),
    passport              = require("passport"),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    flash                 = require("connect-flash"),
    passportLocal         = require("passport-local"),
    methodOverride        = require("method-override"),
    expressSession        = require("express-session"),
    passportLocalMongoose = require("passport-local-mongoose"),
    app                   = express();

//ROUTES SETUP
var campgroundRouter = require("./routes/campgrounds"),
    commentRouter    = require("./routes/comments"),
    indexRouter      = require("./routes/index");

//MODELS
var SeedDB      = require("./seeds"),
    User        = require("./models/user"),
    Comment     = require("./models/comment"),
    Campground  = require("./models/campground");

// APP CONFIG
// mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true});
mongoose.connect("mongodb://elie:Y4VZm4kDije34gT@ds141294.mlab.com:41294/yelp-camp",{ useNewUrlParser: true});
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash())
// SeedDB();

// PASSPORT CONFIG
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

//ROUTES CONFIG
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})
app.use(indexRouter),
app.use("/campgrounds", campgroundRouter),
app.use("/campgrounds/:id/comment",commentRouter)

// Server Starting
app.listen(process.env.PORT || 5000, function(){
  console.log("Server Has Started....");
})
