const express = require('express');
const router = express.Router();
const { getTravels, getTravelsById, saveTravel, deleteTravel } = require('../controllers/travelController');

router
  .get('/', getTravels)
  .get('/:id', getTravelsById)
  .post('/', saveTravel)
  .delete('/:id', deleteTravel);

module.exports = router;