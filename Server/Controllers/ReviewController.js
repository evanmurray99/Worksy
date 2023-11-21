const Review = require('../Models/Review');
const User = require('../Models/User');
const mongoose = require('mongoose');

const createReview = async (req, res) => {
    try {
        const { reviewer, service, rating, text } = req.body;
        const newReview = new Review({ reviewer, service, rating, text });

        await newReview.save();

        res.status(201).json(newReview);

    } catch (err) {
        console.error('Error creating review', err);
        res.status(500).json({ message : 'Internal server error' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        if(!reviewId || !mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message : 'Invalid review ID' });
        }

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if(!deletedReview) {
            return res.status(404).json({ message : 'Review not found' });
        }

        res.status(200).json({ message : 'Review deleted successfully' });
    } catch (err) {
        console.error('Error deleting review by ID', err);
        res.status(500).json({ message : 'Internal server error' });
    }
};

const editReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const {rating, text } = req.body;

        if(!reviewId || !mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message : 'Invalid review ID' });
        }

        const review = await Review.findById(reviewId);

        if(!review) {
            return res.status(404).json({ message : 'Review not found' });
        }

        review.rating = rating;
        review.text = text;
        review.updated = Date.now();

        await review.save();

        res.status(200).json({ message : 'Review updated successfully' });
    } catch (err) {
        console.error('Error updating review by ID', err);
        res.status(500).json({ message : 'Internal server error' });
    }
};

const getReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        if(!reviewId || !mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message : 'Invalid review ID' });
        }

        const review = await Review.findById(reviewId);

        if(!review) {
            return res.status(404).json({ message : 'Review not found' });
        }

        res.status(200).json(review);
    } catch (err) {
        console.error('Error getting review by ID', err);
        res.status(500).json({ message : 'Internal server error' });
    }
}

const getReviewsByService = async (req, res) => {
    try {
        const serviceId = req.params.id;

        if(!serviceId || !mongoose.Types.ObjectId.isValid(serviceId)) {
            return res.status(400).json({ message : 'Invalid service ID' });
        }

        const reviews = await Review.find({ service : serviceId });

        if(!reviews || reviews.length === 0) {
            return res.status(404).json({ message : 'Reviews not found' });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error getting reviews by service ID', err);
        res.status(500).json({ message : 'Internal server error' });
    }
}


const controller = {
    createReview,
    deleteReview,
    editReview, 
    getReview,
    getReviewsByService
};

module.exports = controller;