const express = require('express');
const router = express.Router();
const Service = require('../Models/Service');
const controller = require('../Controllers/ServiceController');

router.get('/:id', controller.getService);
//router.get('category/:name' , controller.getServiceByCategory)
router.post('/', controller.createService);
router.post('/', controller.createService);
router.delete('/:id', controller.deleteService);

module.exports = router;