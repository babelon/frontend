
var Mongoose, Schema;

Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/emails');

exports.define = function(server) {
  var EmailSignup;

  EmailSignup = new Schema({
    email: { type: String, lowercase: true, trim: true, validate: /^.+@.+\..+$/ }
  });
};
