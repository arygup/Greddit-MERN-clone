const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sub: {
    type: Schema.Types.ObjectId,
    ref: 'Sub'
  },
  heading : {
    type: String,
    required: true
  },
  tags : {
    type: String
  },
  adbl :{
    type: Number
  },
  text : {
    type: String,
    required: true
  },
  likes: [
    {user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }}
  ] ,
  comments: [
    {
      user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
      },
      text : {
        type: String
      }
    }
  ],
  date :
  {
    type: Date,
    default: Date.now
  },
  report: [
    {
      user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
      },
      concern : {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
});

module.exports = Post = mongoose.model('post', PostSchema);
 