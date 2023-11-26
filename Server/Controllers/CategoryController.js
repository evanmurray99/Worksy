const Service = require('../Models/Service');
const mongoose = require("mongoose");
const Category = require("../Models/Category");

const addCategory = async (req, res) => {
    try {
      const { name } = req.body;
  
      // Create a new category
      const newCategory = new Category({ name });
  
      // Save the category to the database
      await newCategory.save();
  
      res.status(201).json({ message: 'Category created' });
    } catch (error) {
      
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Function to add a service to a category
  const addService = async (req, res) => {
    try {
      const { name, service } = req.params;
  
      
      const category = await Category.findOne({ name: name });
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      category.services.push(service);
  
      
      await category.save();
  
      res.status(200).json({ message: 'Service added to category' });
    } catch (error) {
      console.error('Error adding service to category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getCategories = async (req, res) => {
    try {
        
        const categories = await Category.find({}, 'name');

       
        const categoryNames = categories.map((category) => category.name);

        // Return the list of category names as a JSON response
        res.status(200).json(categoryNames);
    } catch (error) {
        console.error('Error fetching category names:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCategoriesAndServices = async (req, res) => {
  try {
      
      const categories = await Category.find({});

      // Return the list of category names as a JSON response
      res.status(200).json(categories);
  } catch (error) {
      console.error('Error fetching category names:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const getServices = async (req, res) => {
    try {
      const categoryName = req.params.name;
  
      const category = await Category.findOne({ name: categoryName });
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Find all services with IDs in the category's services array
      const services = await Service.find({ _id: { $in: category.services } });
  
      res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching services by category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const removeService = async (req, res) => {
    try {
      const { name, service } = req.params;
  
      // Find the category by name
      const category = await Category.findOne({ name: name });
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Check if the service is in the category's services array
      const serviceIndex = category.services.indexOf(service);
      if (serviceIndex === -1) {
        return res.status(404).json({ message: 'Service not found in the category' });
      }
  
      // Remove the service from the category's services array
      category.services.splice(serviceIndex, 1);
  
      // Save the category to update the changes
      await category.save();
  
      res.status(200).json({ message: 'Service removed from category' });
    } catch (error) {
      console.error('Error removing service from category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const deleteCategories = async (req, res) => {
    try {
      const { name } = req.body;
  
      // Use Mongoose to delete all categories with the given name
      const result = await Category.deleteMany({ name });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Categories deleted' });
      } else {
        res.status(404).json({ message: 'No categories found with the given name' });
      }
    } catch (error) {
      console.error('Error deleting categories:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  
  module.exports = {
    addCategory : addCategory,
    addService : addService,
    deleteService : removeService,
    deleteCategory : deleteCategories,
    getCategories : getCategories,
    getServices : getServices,
    getCategoriesAndServices :getCategoriesAndServices,
  };