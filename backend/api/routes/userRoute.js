const express = require('express');
const router = express.Router();
const { getUsers, saveUser, loginAuth, deleteUser } = require('../controllers/userController');

router
  .get('/', getUsers)
  .post('/', saveUser)
  .post('/login', loginAuth)
  .delete('/:id', deleteUser);

module.exports = router;