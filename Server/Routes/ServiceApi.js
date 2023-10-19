const express = require('express');
const router = express.Router();
const Service = require('../Models/Service');
const controller = require('../Controllers/ServiceController');

router.get('/:id', controller.getService);
router.post('/', controller.createService);
router.put('/:id', controller.editService);
router.delete('/:id', controller.deleteService);

module.exports = router;