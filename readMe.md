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

### RESTFUL ROUTES
#### Introduction
* Dfine REST and explain WHY it matters
* List all 7 RESTful routes
* Show ecample of RESTful routing in practice

REST - a mapping vetween HTTP routes and CRUD
CRUD - Create Read Update Destroy

name    |   url       | verb  | desc.
=============================================
INDEX   |  /dogs          | GET    | List all dogs
NEW     |  /dogs/new      | GET    | Show new dog form
CREATE  |  /dogs          | POST   | Create a new dog, redirect
SHOW    |  /dogs/:id      | GET    | Shows info about one dog
EDIT    |  /dogs/:id/edit | GET    | Show edit form for one dog
UPDATE  |  /dogs/:id      | PUT    | Update a particular dog, redirect
DESTROY |  /dogs/:id      | DELETE | Delete a particular dog, redirect
