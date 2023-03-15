const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const SubSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    desc: {
        type: String,
        required: true,
    },
    tags: {
        type: String
    },
    banned: {
        type: String
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    followers: [
      {user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }}
    ],
    pst: [
      {post: {
          type: Schema.Types.ObjectId,
          ref: 'Post'
      }}
    ],
    requested: [
      {user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }}
    ],
    blocked: [
      {user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }}
    ],date :
    {
      type: Date,
      default: Date.now
    }
});


module.exports = Sub = mongoose.model('sub', SubSchema);