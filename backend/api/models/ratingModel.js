const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Ratings = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    travelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'travels',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'ratings'
  }
);

module.exports = mongoose.model('ratings', Ratings);
