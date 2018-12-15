# YelpCamp Website
YelpCamp is going to be built in different version that have different objectives

## Version 1

### Initial Setup
* Add Home Page
* Add Campgrounds Page that lists all Campgrounds
  * Each Campground has:
      * Name
      * Image

### Layout and Basic Styling
* Create our header and footer partials
* Add in BootStrap.

### Creating New Campgorunds
* Setup new campground Post routes
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

### Style the campgorunds Page
* Add a better header/title
* Make campgrounds display in a grid

### Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

## Version 2
### Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

### Show Page
* Review the RESTful routes we've seen so far
* Add descrioption to our campground model
* Add a show route/template

### Refactor Mongoose code
* Create a models directory
* Use modole.exports
* Require everything correctly

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts
* The Seed file is to add some sample data to work with

# Add the Comment model!
*  Make our error go way
* Display comments on Campground show page

# Comment New/CREATE
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show Page
* Add sidebar to show page
* Display comments nicely

# Classes
## Show Page  
* container
  * row
    * col-md-3
      * lead [The brand]
      * list-group
        * list-group-item active [Item Category]
    * col-md-9
      * thumbnail
        * img-responsive [Image]
        * caption-full
          * pull-right  [Price: handcode in]
          * [Add "Name"]
          * [Add "Description"]
      * well
        * text-right [The button to create new comment]
        * [Add hr]
        * row
          * col-md-12
            * [Add "Author"]
            * pull-right [10 days ago]
            * [Add "Text"]

# Authentication
## Intro to Author
* What tools are we using?
    * Passport
    * Passport Local
    * Passport Local Mongoose
* Walk through auth flow
* Discuss sessions
    * Express-Session

# Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User Model

# Necessary Packages
* passport
* passport-local
* passport-local-mongoose
* express-session

# Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth Pt. 3 - Login
* Add Login routes
* Add login template

# Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

# Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar correctly

# Refactor the Routes
* Use Express router to reorganize all routes
