const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Travels = new Schema(
  {
    userPosted: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    ratings: {
      type: Array,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'travels'
  }
);

module.exports = mongoose.model('travels', Travels);
