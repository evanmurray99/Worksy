const express = require('express');
const router = express.Router();
const Review = require('../Models/Review');
const controller = require('../Controllers/ReviewController');

router.post('/' , controller.createReview); // Create a new review
router.delete('/:id', controller.deleteReview); // Delete a review by ID
router.put('/:id', controller.editReview); // Edit a review by ID
router.get('/:id', controller.getReview); // Get a review by ID
router.get('/service/:id', controller.getReviewsByService); // Get all reviews for a service
router.get('/user/:id', controller.getReviewsByUser); // Get all reviews of a user


module.exports = router;