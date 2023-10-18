// Tests for the Service API
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); // Replace with the path to your Express app


describe('testing the service api', function() {
    let id;
    before((done) => {
        db.connectDB()
          .then(() => {
            done(); // Signal that before hook is complete
          })
          .catch((error) => {
            done(error); // Signal that before hook failed with an error
          });
    });


    it('Create a service', (done) => { 
        const newService = {
            seller : "62510bf3b9ee04bdd8e072aa",
            description : "test description",
            title : "test title",
            price: 100,
            categories : ["test category"]
        };

        request(app)
        .post('/api/services')
        .send(newService)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('title', 'test title');
            expect(response.body).to.have.property('description', 'test description');
            expect(response.body).to.have.property('price', 100);
            expect(response.body).to.have.property('seller', "62510bf3b9ee04bdd8e072aa"); 

            id = response.body._id;

            done(); // Signal that the test case is complete
        });   
    });

    it ('Get created service', (done) => {
        request(app)
        .get(`/api/services/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            // Add more assertions based on your API response structure
            done(); // Signal that the test case is complete
        });
    });

    it ('Delete created service', (done) => {
        request(app)
        .delete(`/api/services/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            // Add more assertions based on your API response structure
            done(); // Signal that the test case is complete
        });
    });
});