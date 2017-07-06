// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    address: [{
      streetNumber : { type: Number, required: true},
      streetName: { type: String, required: true},
      city: { type: String, required: true},
      state: { type: String, required: true},
      zip: { type: Number, required: true},
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;