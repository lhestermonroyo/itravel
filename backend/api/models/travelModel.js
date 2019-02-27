const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Travels = new Schema(
  {
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
    timestamp: {
      type: Date,
      default: Date.now,
    }
  },
  {
    collection: 'travels'
  }
);

module.exports = mongoose.model('travels', Travels);
