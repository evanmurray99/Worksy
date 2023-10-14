const express = require('express');
const router = express.Router();
const Service = require('../Models/Service');
const controller = require('../Controllers/CategoryController');


router.post('/', controller.addCategory);
router.get('/' ,controller.getCategories)
router.get('/:name' , controller.getServices)
router.put('/:name/add-service/:service' , controller.addService)
router.delete('/:name/remove-service/:service' , controller.deleteService)


module.exports = router;