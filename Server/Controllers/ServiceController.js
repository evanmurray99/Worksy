const Service = require('../Models/Service');
const User = require('../Models/User');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;


// GET /services by Id
const getService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (err) {
        console.error('Error fetching service by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
   

// POST /services - create a new service
const createService = async (req, res) => {
    try {
        const { seller, prince, created, updated } = req.body;
        const rating = 0;
        const reviews = [];

        const newService = new Service(
            {
                seller,
                prince,
                created,
                updated,
                rating,
                reviews
            });

        // Save the service to the database
        await newService.save();

        res.status(201).json(newService);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
        
    }
};

// DELETE /services/:id - delete a service by its id
const deleteService = async (req, res ) => {
    try {
        const serviceId = req.params.id;

        if (!serviceId || !mongoose.isValidObjectId(serviceId)) {
            return res.status(400).json({ message: 'Invalid service ID' });
        }

        const deletedService = await Service.findByIdAndRemove(serviceId);

        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (err) {
        console.error('Error deleting service by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const controller = {
    getService,
    createService,
    deleteService
}

module.exports = controller;