
var Mongoose, Schema;

Mongoose = require('mongoose');
Schema = Mongoose.Schema;

exports.define = function(server) {

  var EmailSignup;

  EmailSignup = new Schema({
    email: { type: String, lowercase: true, trim: true, validate: /^.+@.+\..+$/ }
  });

  Mongoose.model('EmailSignup', EmailSignup);

};
