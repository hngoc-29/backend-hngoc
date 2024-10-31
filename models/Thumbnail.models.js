const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const thumbnailSchema = Schema( {
  title: {
    type: String,
    require: true,
  },
  image_url: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  wiew: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  }, {
    timestamps: true,
    collection: 'Thumbnails',
  })
  module.exports = mongoose.model('Thumbnails', thumbnailSchema);