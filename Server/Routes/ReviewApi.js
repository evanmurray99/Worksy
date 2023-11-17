const express = require('express');
const router = express.Router();
const Review = require('../Models/Review');
const controller = require('../Controllers/ReviewController');

router.post('/' , controller.createReview); // Create a new review
router.delete('/:id', controller.deleteReview); // Delete a review by ID
router.put('/:id', controller.editReview); // Edit a review by ID
router.get('/:id', controller.getReview); // Get a review by ID

module.exports = router;