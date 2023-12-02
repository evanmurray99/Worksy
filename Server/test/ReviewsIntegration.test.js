const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); 
require("./UserIntegration.test")
require("./ServiceIntegration.test")
const User = require('../Models/User')
const Service = require('../Models/Service')
const Review = require('../Models/Review')

describe('Review Integration Tests', function() {
    let reviews = []
    let services = []
    let users = []

    before((done) => {
        db.connectDB()
        .then(async () => {
            var user = await request(app).post('/api/users/').send({
                firstName: "first",
                lastName: "testUser",
                email: "test@email.com",
                password: "password",
                isStudent: false
            })
            user = JSON.parse(user.text)
            users.push(user)

            var firstService = await request(app).post('/api/services/').send({
                seller: user._id,
                title: "first",
                description: "This is a test description",
                categories: [],
                price: 25
            })
            firstService = JSON.parse(firstService.text)
            services.push(firstService)

            done(); // Signal that before hook is complete
        })
        .catch((error) => {
            done(error); // Signal that before hook failed with an error
        });
    });

    after(async () => {
        for(var i = 0; i < users.length; i++)
        {
            await User.findOneAndDelete({_id: users[i]._id})
        }
  
        for(var i = 0; i < services.length; i++)
        {
          await Service.findOneAndDelete({_id: services[i]._id})
        }

        for(var i = 0; i < reviews.length; i++)
        {
            await Review.findOneAndDelete({_id: reviews[i].review._id})
        }
    })

    it('User can create multiple reviews on the same service.', async() =>{
        var newReview = await request(app).post('/api/reviews/').send({
            reviewer: users[0]._id,
            service: services[0]._id,
            rating: 3,
            text: "Initial Review"
        })

        expect(newReview.status).to.equal(201)
        newReview = JSON.parse(newReview.text)
        reviews.push({user: users[0], review: newReview})

        var duplicateReview = await request(app).post('/api/reviews/').send({
            reviewer: users[0]._id,
            service: services[0]._id,
            rating: 5,
            text: "Duplicate Review"
        })

        expect(duplicateReview.status).to.equal(201)
        duplicateReview = JSON.parse(duplicateReview.text)
        reviews.push({user: users[0] , review: duplicateReview})

        var serviceReviews = request(app).get('/api/reviews/service/'+services[0]._id)
        serviceReviews = JSON.parse((await serviceReviews).text)

        for(var i = 0; i < serviceReviews.length; i++)
        {
            expect(serviceReviews[i].reviewer).to.equal(users[0]._id)
            expect(serviceReviews[i].service).to.equal(services[0]._id)

            if(serviceReviews[i].text === "Duplicate Review")
            {
                expect(serviceReviews[i].rating).to.equal(5)
            }
            else
            {
                expect(serviceReviews[i].rating).to.equal(3)
            }
        }
    });
    
    it('User can create reviews of different services.', async() =>{
        var newService = await request(app).post('/api/services/').send({
            seller: users[0]._id,
            title: "second",
            description: "Another test description",
            categories: [],
            price: 5
        })

        newService = JSON.parse(newService.text)
        services.push(newService)

        var newReview = await request(app).post('/api/reviews/').send({
            reviewer: users[0]._id,
            service: services[0]._id,
            rating: 2,
            text: "Follow-up"
        })

        expect(newReview.status).to.equal(201)
        newReview = JSON.parse(newReview.text)
        reviews.push({user: users[0], review: newReview})

        var differentReview = await request(app).post('/api/reviews/').send({
            reviewer: users[0]._id,
            service: services[1]._id,
            rating: 4,
            text: "Review of a new service"
        })

        expect(differentReview.status).to.equal(201)
        differentReview = JSON.parse(differentReview.text)
        reviews.push({user: users[0], review: differentReview})

        var reviewOfService1 = await request(app).get('/api/reviews/'+newReview._id)
        reviewOfService1 = JSON.parse(reviewOfService1.text)

        var reviewOfNewService = await request(app).get('/api/reviews/'+differentReview._id)
        reviewOfNewService = JSON.parse(reviewOfNewService.text)

        expect(reviewOfService1.reviewer).to.equal(reviewOfNewService.reviewer)
        expect(reviewOfService1.service).not.to.equal(reviewOfNewService.service)
    });
    
    it('User can find all the reviews they have created.', async() =>{
        var secondUser = await request(app).post('/api/users/').send({
            firstName: "Second",
            lastName: "user",
            email: "username@email.com",
            password: "1234",
            isStudent: true
        })

        secondUser = JSON.parse(secondUser.text)
        users.push(secondUser)

        var thirdService = await request(app).post('/api/services/').send({
            seller: users[0]._id,
            title: "third",
            description: "Description...",
            categories: [],
            price: 50
        })

        thirdService = JSON.parse(thirdService.text)
        services.push(thirdService)

        const numNewReviews = 3
        for(var i = 0; i < numNewReviews; i++)
        {
            var serviceNum = 1

            if(i === numNewReviews-1)
            {
                serviceNum = 2
            }

            var currReview = await request(app).post('/api/reviews/').send({
                reviewer: users[1]._id,
                service: services[serviceNum]._id,
                rating: i,
                text: "Review"+i
            })
    
            currReview = JSON.parse(currReview.text)
            reviews.push({user: users[1], review: currReview})
        }

        for(var i = 0; i < users.length; i++)
        {
            var userReviews = await request(app).get('/api/reviews/user/' + users[i]._id)
            userReviews = JSON.parse(userReviews.text)

            if(i == 0)
            {
                expect(userReviews.length).to.equal(4)
            }
            else
            {
                expect(userReviews.length).to.equal(3)
            }

            for(var j = 0; j < userReviews.length; j++)
            {
                expect(userReviews[j].reviewer).to.equal(users[i]._id)

                for(var k = 0; k < reviews.length; k++)
                {
                    if(reviews[k].user === users[i]._id && reviews[k].review._id === userReviews[j]._id)
                    {
                        expect(userReviews[j].service).to.equal(reviews[k].review.service)
                        expect(userReviews[j].text).to.equal(reviews[k].review.text)
                        expect(userReviews[j].rating).to.equal(reviews[k].review.rating)
                    }
                }
            }
        }
    });
})
