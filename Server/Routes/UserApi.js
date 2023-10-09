const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const controller = require('../Controllers/UserController') // 

router.get('/:id', controller.getUser);
router.post('/', controller.createUser);
router.put('/:id/update-bio', controller.updateUserBio);
router.delete('/:id', controller.deleteUserById)

module.exports = router;
