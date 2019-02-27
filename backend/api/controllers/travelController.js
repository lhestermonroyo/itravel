const config = require('../config/database');
const Travels = require('../models/travelModel');

async function getTravels(req, res, next) {
  await Travels
    .find()
    .sort({ _id: -1 })
    .then(result => res.json(result));
};

module.exports= {
  getTravels,
};