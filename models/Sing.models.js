const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const singSchema = Schema( {
  singname: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  image_url: {
    type: String,
    require: true,
  },
  audio_url: {
    type: String,
    require: true,
  },
  parent: {
    type: String,
    require: true,
  },
  }, {
    timestamps: true,
    collection: 'Sings',
  })
  module.exports = mongoose.model('Sings', singSchema);