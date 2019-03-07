const multer = require('multer');
const path = require('path');
const config = require('../config/database');
const Travels = require('../models/travelModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000 * 5000 * 5
  },
  fileFilter: fileFilter,
});

async function getTravels(req, res, next) {
  await Travels
    .find()
    .sort({ _id: -1 })
    .populate('userPosted')
    .then(result => res.json(result))
    .catch(err => console.log(err));
};

async function getTravelsById(req, res, next) {
  const { id } = req.params;
  await Travels
    .findById(id)
    .populate('userPosted')
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
}

async function saveTravel(req, res, next) {
  await upload.array('uploadPhotos')(req, res, (err) => {
    if(err) {
      console.log("What error?", err);
    }

    if(req.files) {
      let imgArray = [];
      for(let i = 0; i < req.files.length; i++) {
        console.log(req.files[i].path);
        imgArray[i] = req.files[i].path;
      }

      const { userPosted, name, description, location, type } = req.body;
      const newTravel = new Travels({
        userPosted: userPosted,
        name: name,
        description: description,
        location: location,
        type: type,
        photos: imgArray,
      });

      newTravel
        .save()
        .then(result => res.json({ success: true, result }))
        .catch(err => res.json({ success: false, message: 'An error occured while posting travel destionation.', type: 'danger'}));
    }
    else {
      res.json({ success: false, message: 'An error occured while posting travel destionation.', type: 'danger'})
    }
  })
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
  getTravelsById,
  saveTravel,
  deleteTravel,
};