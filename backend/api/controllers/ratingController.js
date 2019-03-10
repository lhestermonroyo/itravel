const Ratings = require('../models/ratingModel');

async function getRatings(req, res, next) {
  const { id } = req.params;
  await Ratings
    .findById(id)
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
}

async function saveRating(req, res, next) {
  const { userId, travelId, rating, comment } = req.body;

  const newRating = new Ratings({
    userId: userId,
    travelId: travelId,
    rating: rating,
    comment: comment,
  });

  await newRating
    .save()
    .then(result => res.json({ success: true, result }))
    .catch(err => res.json({ success: false, message: 'An error occured while saving your rating.', type: 'danger'}));
}

module.exports = {
  getRatings,
  saveRating,
};


