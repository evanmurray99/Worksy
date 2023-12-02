// Tests for the Service API
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); // Replace with the path to your Express app
require("./UserIntegration.test")
const User = require('../Models/User')
const Service = require('../Models/Service')

describe('Search Integration Tests', function() {
  var currDate = new Date()
  let serviceInfo = [
    {title: "test", descript: "words", categories: []},
    {title: "Building Designer", descript: "sample paragraph", categories:["Architecture"]},
    {title: "Pianist", descript: "test musical description", categories: ["Music"]},
    {title: "Builder", descript: "Creation and design of buildings", categories: ["Architecture", "Business"]},
    {title: "Architect", descript: "Modern architecture", categories: ["Architecture", "Music"]}];
  let user = null;
  let otherUser = null;
  const numServices = 5;
  const allCategories = ["Architecture", "Business", "Music"]
  const serviceContents = []

    before((done) => {
        db.connectDB()
          .then(async() => {
            var response = await request(app).post('/api/users/').send({
              firstName: 'demo',
              lastName: 'account',
              email: 'demo@email.com',
              password: 'password',
              isStudent: true
            })
            user = JSON.parse(response.text)

            response = await request(app).post('/api/users/').send({
              firstName: 'other',
              lastName: 'user',
              email: 'other@email.com',
              password: 'other',
              isStudent: true
            })
            otherUser = JSON.parse(response.text)
  
            for(var i = 0; i < numServices; i++)
            {
              var currUser = user

              if(i === numServices-1)
              {
                currUser = otherUser
              }

              var currService = await request(app).post('/api/services/').send({
                seller: currUser._id,
                description: serviceInfo[i].descript,
                title: serviceInfo[i].title,
                price: i,
                categories: serviceInfo[i].categories,
                created: currDate,
                updated: currDate
              })
              serviceContents.push(JSON.parse(currService.text))
            }

            done(); // Signal that before hook is complete
          })
          .catch((error) => {
            done(error); // Signal that before hook failed with an error
          });
    });

    after(async () => {
      await User.findOneAndDelete({_id: user._id})
      await User.findOneAndDelete({_id: otherUser._id})

      for(var i = 0; i < numServices; i++)
      {
        await Service.findOneAndDelete({_id: serviceContents[i]._id})
      }
      
    })

    it('User can find services by multiple categories.', async() =>{
      var noResults = await request(app).get('/api/services/search/Fashion')
      expect(JSON.parse(noResults.text).length).to.equal(0)

      var threeRes = await request(app).get('/api/services/search/Music Business')
      threeRes = JSON.parse(threeRes.text)
      expect(threeRes.length).to.equal(3)

      var allServices = await request(app).get('/api/services')
      allServices = JSON.parse(allServices.text)
      expect(allServices.length).to.equal(5)

      for(var i = 0; i < allServices.length; i++)
      {
        var isFound = false
        
        for(var j = 0; j < threeRes.length; j++)
        {
          var currService = threeRes[j].service

          if(currService._id === allServices[i]._id)
          {
            isFound = true
            expect(currService.categories.includes("Music") 
              || currService.categories.includes("Business")).to.equal(true)
          }
        }

        if(isFound === false)
        {
          expect(allServices[i].categories.includes("Music")).to.equal(false)
          expect(allServices[i].categories.includes("Business")).to.equal(false)
        }
      }
    });

    it('User can find services by a combination of keywords and categories.', async() =>{
      var threeRes = await request(app).get('/api/services/search/test Business')
      threeRes = JSON.parse(threeRes.text)
      expect(threeRes.length).to.equal(3)

      var allServices = await request(app).get('/api/services')
      allServices = JSON.parse(allServices.text)
      expect(allServices.length).to.equal(5)

      for(var i = 0; i < allServices.length; i++)
      {
        var isFound = false
        
        for(var j = 0; j < threeRes.length; j++)
        {
          var currService = threeRes[j].service

          if(currService._id === allServices[i]._id)
          {
            isFound = true
            expect(currService.description.toLowerCase().includes("test") 
              || currService.title.toLowerCase().includes("test") 
              || currService.categories.includes("test")
              || currService.description.toLowerCase().includes("business") 
              || currService.title.toLowerCase().includes("business") 
              || currService.categories.includes("Business")).to.equal(true)
          }
        }

        if(isFound === false)
        {
          expect(allServices[i].title.toLowerCase().includes("test")).to.equal(false)
          expect(allServices[i].description.toLowerCase().includes("test")).to.equal(false)
          expect(allServices[i].categories.includes("test")).to.equal(false)
          expect(allServices[i].title.toLowerCase().includes("business")).to.equal(false)
          expect(allServices[i].description.toLowerCase().includes("business")).to.equal(false)
          expect(allServices[i].categories.includes("Business")).to.equal(false)
        }
      }
    });

    it('User can find services by multiple keywords.', async() =>{
      var noResults = await request(app).get('/api/services/search/hippo')
      expect(JSON.parse(noResults.text).length).to.equal(0)

      var threeRes = await request(app).get('/api/services/search/Pianist build')
      threeRes = JSON.parse(threeRes.text)
      expect(threeRes.length).to.equal(3)

      var allServices = await request(app).get('/api/services')
      allServices = JSON.parse(allServices.text)
      expect(allServices.length).to.equal(5)

      for(var i = 0; i < allServices.length; i++)
      {
        var isFound = false
        
        for(var j = 0; j < threeRes.length; j++)
        {
          var currService = threeRes[j].service

          if(currService._id === allServices[i]._id)
          {
            isFound = true
            expect(currService.title.toLowerCase().includes("ianist")
              || currService.description.toLowerCase().includes("pianist")
              || currService.title.toLowerCase().includes("build")
              || currService.description.toLowerCase().includes("build")).to.equal(true)
          }
        }

        if(isFound === false)
        {
          expect(allServices[i].title.toLowerCase().includes("pianist")).to.equal(false)
          expect(allServices[i].description.toLowerCase().includes("pianist")).to.equal(false)
          expect(allServices[i].title.toLowerCase().includes("build")).to.equal(false)
          expect(allServices[i].description.toLowerCase().includes("build")).to.equal(false)
        }
      }
    });
})