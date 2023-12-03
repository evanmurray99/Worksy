// Tests for the Service API
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); // Replace with the path to your Express app
require("./UserIntegration.test")
const Category = require('../Models/Category')
const Service = require('../Models/Service')
const User = require('../Models/User')
const Review = require('../Models/Review')

describe('Service Integration Tests', function() {
    var currDate = new Date()
    let services = [];
    var reviewIds = [];
    let user = null;
    const numServices = 5;
    const allCategories = ["Architecture", "Business", "Fashion", "Music"]
    const categories = [
      [],
      ["Architecture"],
      ["Music"],
      ["Architecture", "Business"],
      ["Architecture", "Fashion", "Music"]]

    before((done) => {
      db.connectDB()
        .then(async () => {
          var response = await request(app).post('/api/users/').send({
            firstName: 'demo',
            lastName: 'account',
            email: 'demo@email.com',
            password: 'password',
            isStudent: true
          })
          user = JSON.parse(response.text)

          for(var i = 0; i < numServices; i++)
          {
            var currService = await request(app).post('/api/services/').send({
              seller: user._id,
              description: 'test'+i,
              title: i,
              price: i,
              categories: categories[i],
              created: currDate,
              updated: currDate
            })
            services.push(JSON.parse(currService.text))
    
            for(var j = 0; j < categories[i].length; j++)
            {
              await request(app).put('/api/categories/' + categories[i][j] + '/add-service/' + services[i]._id)
            }
          }

          done(); // Signal that before hook is complete
        })
        .catch((error) => {
          done(error); // Signal that before hook failed with an error
        });
    });

    after(async () => {
      await User.findOneAndDelete({_id: user._id})

      for(var i = 0; i < numServices; i++)
      {
        for(var j = 0; j < categories[i].length; j++)
        {
          await request(app).delete('/api/categories/' + categories[i][j] + '/remove-service/'+services[i]._id)
        }

        await Service.findOneAndDelete({_id: services[i]._id})
      }
      
    })

    it('User can find all services for a category.', async() =>{
      //Service with no categories.
      const notFound = await request(app).delete('/api/categories/Fashion/remove-service/'+services[0]._id)
      expect(notFound.status).to.equal(404)
      
      for(var i = 0; i < allCategories.length; i++)
      {
        var count = 0
        var currServices = await request(app).get('/api/categories/'+allCategories[i])
        currServices = JSON.parse(currServices.text)
      
        for(var j = 0; j < currServices.length; j++)
        {
          expect(currServices[j].categories.includes(allCategories[i])).is.equal(true)
        }
      
        for(var j = 0; j < numServices; j++)
        {
          if(categories[j].includes(allCategories[i]))
          {
            count++;
          }
        }
      
        expect(currServices.length).to.equal(count)
      }
    });

    const reviews = [
      [],
      [{comment: "Good", rating: 3}],
      [{comment: "test review", rating: 1}, {comment: "another review", rating: 2}],
      [{comment: "Good", rating: 3}, {comment: "test review", rating: 1}, {comment: "Excellent comment", rating: 5}],
      [{comment: "Excellent comment", rating: 5}, {comment: "bad", rating: 2}]]

    it('User can find all reviews by service.', async() =>{

      var response = await request(app).post('/api/users/').send({
        firstName: 'alt',
        lastName: 'user',
        email: 'alt@gmail.com',
        password: 'account',
        isStudent: true
      })
      var secondUser = JSON.parse(response.text)

      for(var i = 0; i < reviews.length; i++)
      {
        for(var j = 0; j < reviews[i].length; j++)
        {
          var currUser = user

          if(j === reviews[i].length-1)
          {
            currUser = secondUser
          }

          var currReview = await request(app).post('/api/reviews/').send({
            reviewer: currUser._id,
            service: services[i]._id,
            rating: reviews[i][j].rating,
            text: reviews[i][j].comment
          })

          currReview = JSON.parse(currReview.text)
          reviewIds.push(currReview._id)
        }
      }

      for(var i = 0; i < reviews.length; i++)
      {
        count = 0
        var revByService = await request(app).get('/api/reviews/service/' + services[i])
        revByService = JSON.parse(revByService.text)

        for(var j = 0; j < revByService.length; j++)
        {
          expect(revByService[j].text).is.equal(reviews[i][j].text)
          expect(revByService[j].rating).is.equal(reviews[i][j].rating)
          expect(revByService[j].service).is.equal(services[i]._id)

          if(j === revByService.length-1)
          {
            expect(revByService[j].reviewer).is.equal(secondUser._id)
          }
          else
          {
            expect(revByService[j].reviewer).is.equal(user._id)
          }
        }
      }

      await User.findOneAndDelete({_id: secondUser._id})

      for(var i = 0; i < reviewIds.length; i++)
      {
        await Review.findOneAndDelete({_id: reviewIds[i]})
      }
    }).timeout(3000);
})