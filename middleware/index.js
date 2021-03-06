var Campground    = require("../models/campground"),
    Comment       = require("../models/comment"),
    middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash("error","You need to be logged in to that")
  res.redirect("/login")
}

middlewareObj.checkCommentOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundComment){
      if(err){
        res.redirect("back")
      }else{
        if(foundComment.author.id.equals(req.user._id)){
          next()
        } else{
          req.flash("error","You don't have permission to that")
          res.redirect("back")
        }
      }
    })
  }else{
    req.flash("error","You need to be logged in to that")
    res.redirect("back")
  }
}

middlewareObj.checkCampgroundOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id,function(err,foundCamp){
      if(err){
        res.redirect("back")
      }else{
        if(foundCamp.author.id.equals(req.user._id)){
          next()
        } else{
          req.flash("error","You don't have permission to that")
          res.redirect("back")
        }
      }
    })
  }else{
    req.flash("error","You need to be logged in to that")
    res.redirect("back")
  }
}

module.exports = middlewareObj;
