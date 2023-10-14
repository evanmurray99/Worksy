const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const controller = require('../Controllers/UserController') // 

router.get('/:token/auth', controller.getUserByToken);
router.get('/:id', controller.getUser);
router.post('/', controller.createUser);
router.post('/login', controller.login)
router.put('/:id/update-bio', controller.updateUserBio);
router.put('/:id/add-service/:service', controller.addService)
router.delete('/:id', controller.deleteUserById)

module.exports = router;
