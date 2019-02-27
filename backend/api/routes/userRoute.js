const express = require('express');
const router = express.Router();
const { getUser, saveUser, loginAuth, deleteUser } = require('../controllers/userController');

router
  .get('/', getUser)
  .post('/', saveUser)
  .post('/login', loginAuth)
  .delete('/:id', deleteUser);

module.exports = router;