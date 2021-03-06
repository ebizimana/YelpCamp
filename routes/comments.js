var express       = require("express"),
    middleware    = require("../middleware"),
    Comment       = require("../models/comment"),
    Campground    = require("../models/campground"),
    router        = express.Router({mergeParams:true});

// NEW - Display form to make a new comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res) {
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

// Edit a specific comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
  Comment.findById(req.params.comment_id,function(err,foundCommnet){
    if(err){
      res.redirect("back")
    } else{
      res.render("comment/edit",{camp_id:req.params.id, comment:foundCommnet})
    }
  })
})

//Update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
    if(err){
      res.redirect("back")
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

//Delete Comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndDelete(req.params.comment_id, function(err){
    if(err){
      res.redirect("back")
    }else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

module.exports= router
