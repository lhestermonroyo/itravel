const express = require('express');
const router = express.Router();
const { getUsers, getUserById, saveUser, updateUser, loginAuth, deleteUser } = require('../controllers/userController');

router
  .get('/', getUsers)
  .get('/:id', getUserById)
  .post('/', saveUser)
  .put('/:id', updateUser)
  .post('/login', loginAuth)
  .delete('/:id', deleteUser);

module.exports = router;