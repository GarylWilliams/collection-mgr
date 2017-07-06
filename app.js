// Using your schema, build an Express app that lets you view your collection, add to your collection, edit items in your collection, and delete items from your collection.

const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/collection');
const User = require('./user.js');


// Create app
const app = express();


// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//'extended: false' parses strings and arrays.
//'extended: true' parses nested objects
app.use('/static', express.static('static'));
// app.use('/static', express.static('static'));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

//Create or add data
let user = new User ({firstName : "Shannon", lastName : "Hill"});
user.save().then(function (){
  console.log("user has been added")
}).catch(function () {
  console.log("user has not been added")
})
  console.log(user);

//Edit or update item
User.updateOne({firstName : "Brian"},
  {$push: {address : { streetNumber : 3058, streetName : "Indianwood Ct", city : "Raleigh", state: "NC", zip: 27604}}}).catch(function (error, affected, resp){
    console.log(error);
  })

//Delete an item
User.deleteOne({firstName : "Shannon"}).catch(function (error){
  console.log(error);
})

app.get('/', function (req, res){
  res.render('index');
});


app.listen(3000, function(){
  console.log('Started express application!')
});