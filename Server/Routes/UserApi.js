const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const controller = require('../Controllers/UserController') // 

router.get('/', controller.getUsers);
router.post('/', controller.addUser);

module.exports = router;
