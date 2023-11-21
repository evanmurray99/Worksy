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
        const { seller, description,title, price, created, updated , categories} = req.body;
        const rating = 0;
        const reviews = [];

        const newService = new Service(
            {
                seller,
                description,
                title,
                price,
                created,
                updated,
                categories,
                rating,
                reviews
            });

        // Save the service to the database
        await newService.save();

        res.status(201).json(newService);
    } catch (err) {
        console.error('Error creating service:', err);
        res.status(500).json({ message: 'Internal server error '});
        
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

const editService = async (req, res) => {
    try {
      const serviceId = req.params.id;
      const { description, title, price, categories } = req.body;
  
      if (!serviceId || !mongoose.isValidObjectId(serviceId)) {
        return res.status(400).json({ message: 'Invalid service ID' });
      }
  
      // Find the service by its ID
      const service = await Service.findById(serviceId);
  
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Update the service properties with the new values
      service.description = description;
      service.title = title;
      service.price = price;
      service.categories = categories;
  
      // Save the updated service
      await service.save();
  
      res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
      console.error('Error editing service by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

  };

  const searchServices = async (req, res) => {
    const query = req.params.query;
    const queryList = query.trim().split(' ').map(keyword => keyword.toLowerCase());

    try {
      
        const result = await Service.find({
            $or: [
              { description: { $regex: queryList.map(word => `.*${word}.*`).join('|'), $options: 'i' } },
              { title: { $regex: queryList.map(word => `.*${word}.*`).join('|'), $options: 'i' } },
              { categories: { $elemMatch: { $regex: queryList.map(word => `.*${word}.*`).join('|'), $options: 'i' } } },
            ],
          });
          
  
    
      const scoredResults = result.map(service => {
        let score = 0;
  
        
        queryList.forEach(keyword => {
          if (service.description.toLowerCase().includes(keyword)) {
            score += 1;
          }
        });
  
        
        queryList.forEach(keyword => {
          if (service.title.toLowerCase().includes(keyword)) {
            score += 1;
          }
        });
  
        
        queryList.forEach(keyword => {
          if (service.categories.join().toLowerCase().includes(keyword)) {
            score += 1;
          }
        });
  
        return { service, score };
      });
  
      scoredResults.sort((a,b)=> {return b.score - a.score});
      const filteredResults = scoredResults.filter(item => item.score > 0);
  
      
      res.json(filteredResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getAllServices = async (req, res) => {
    try 
    {
      const result = await Service.find({});
      res.json(result);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

const controller = {
    getService,
    createService,
    deleteService,
    editService,
    searchServices,
    getAllServices,
}

module.exports = controller;