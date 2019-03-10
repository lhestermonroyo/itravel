const express = require('express');
const router = express.Router();
const { getRatings, saveRating } = require('../controllers/ratingController');

router
  .get('/:id' , getRatings)
  .post('/', saveRating);

module.exports = router;