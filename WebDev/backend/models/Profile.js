const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  bio : {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
