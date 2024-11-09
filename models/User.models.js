const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const userSchema = Schema( {
  fullname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
    min: 6,
    max: 15,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  avata: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnJFgLGOblYzdNQfpPpUVsS0bLa-3XB7E3Q&s',
      require: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Member'],
      require: true,
    default: 'Member',
    },
    codetoken: {
      type: String,
    default: null,
    },
    verify: {
      type: Boolean,
    default: false,
    },
  }, {
    timestamps: true,
    collection: 'accounts',
  })
  module.exports = mongoose.model('User', userSchema);