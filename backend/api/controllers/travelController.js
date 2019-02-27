const config = require('../config/database');
const Travels = require('../models/travelModel');

async function getTravels(req, res, next) {
  await Travels
    .find()
    .sort({ _id: -1 })
    .then(result => res.json(result));
};

async function saveTravel(req, res, next) {
  const { userId, name, description, location, type, photos } = req.body;

  const newTravel = new Travels({
    userId: userId,
    name: name,
    description: description,
    location: location,
    type: type,
    photos: photos,
  });

  await newTravel
    .save()
    .then(result => res.json(result))
    .catch(err => res.json({ success: false }));
}

async function deleteTravel(req, res, next) {
  const { id } = req.params;

  await Travels
    .findById(id)
    .then(result => result.remove().then(() => res.json({ success: true })))
    .catch(err => res.json({ success: false }));
}

module.exports= {
  getTravels,
  saveTravel,
  deleteTravel,
};