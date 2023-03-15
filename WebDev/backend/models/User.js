const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required : true
    },
    lname: {
        type: String,
        required : true
    },
    uname: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    pno: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    followers: [
      {user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }}
    ] ,
    followings: [
      {user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }}
    ],
    saved: [
      {post: {
          type: Schema.Types.ObjectId,
          ref: 'Post'
      }}
    ]
});


module.exports = User = mongoose.model('user', UserSchema);