const express = require('express');
const router = express.Router();
const { getTravels, saveTravel, deleteTravel } = require('../controllers/travelController');

router
  .get('/', getTravels)
  .post('/', saveTravel)
  .delete('/:id', deleteTravel);

module.exports = router;