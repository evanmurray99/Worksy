// Tests for the Service API
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); // Replace with the path to your Express app
require("./User.test")

describe('SERVICE API TEST', function() {
    let id;
    let user_id;
    before((done) => {
        db.connectDB()
          .then(() => {
            done(); // Signal that before hook is complete
          })
          .catch((error) => {
            done(error); // Signal that before hook failed with an error
          });
    });

    it('Create a user', (done) => {
        const newUser = {
          firstName: 'Test',
          lastName : 'User',
          email: 'testuser@myumanitoba.ca',
          password: 'testpassword',
          isStudent : 'true'
        };
    
        request(app)
          .post('/api/users')
          .send(newUser)
          .set('Accept', 'application/json')
          .end((err, response) => {
            if (err) {
              return done(err); // Signal that the test case failed with an error
            }
    
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('firstName', 'Test');
        
              user_id = response.body._id;
              
            done(); // Signal that the test case is complete
          });
      });

    it('Add service for created user ', (done) => { 
        const newService = {
            seller : user_id,
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
            expect(response.body).to.have.property('seller', user_id); 

            id = response.body._id;

            done(); // Signal that the test case is complete
        });   
    });


    it('Edit service', (done) => {
      const editService = {
          description : "changed description",
          title : "changed title",
          price: 100,
          categories : ["changed category"]
      };

      request(app)
      .put(`/api/services/${id}`)
      .send(editService)
      .set('Accept', 'application/json')
      .end((err, response) => {
          if (err) {
              return done(err); // Signal that the test case failed with an error
          }

          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message', 'Service updated successfully');

          done(); // Signal that the test case is complete
      });
    });

    it('Edit invalid service', (done) => {
      const editService = {
          description : "changed description",
          title : "changed title",
          price: 100,
          categories : ["changed category"]
      };

      request(app)
      .put(`/api/services/${'1'}`)
      .send(editService)
      .set('Accept', 'application/json')
      .end((err, response) => {
          if (err) {
              return done(err); // Signal that the test case failed with an error
          }

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Invalid service ID');

          done(); // Signal that the test case is complete
      });
    });
  

    it ('Delete Invalid service', (done) => {
        request(app)
        .delete(`/api/services/${'1'}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Invalid service ID')
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

    it ('Get invalid service', (done) => {
        request(app)
        .get(`/api/services/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Service not found');
            // Add more assertions based on your API response structure
            done(); // Signal that the test case is complete
        });
    });

    it ('Delete Already deleted service', (done) => {
        request(app)
        .delete(`/api/services/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Service not found')
            // Add more assertions based on your API response structure
            done(); // Signal that the test case is complete
        });
    });

    it('Delete user', (done) => {
    

        // Send a DELETE request to delete the user by ID
        request(app)
          .delete(`/api/users/${user_id}`)
          .set('Accept', 'application/json')
          .end((err, response) => {
            if (err) {
              return done(err); // Signal that the test case failed with an error
            }
    
            if (response.status === 404) {
              // If the user is not found (404), it's still a successful deletion
              expect(response.status).to.equal(404);
            } else {
              // If the user is found and deleted (200), it's a successful deletion
              expect(response.status).to.equal(200);
            }
    
            expect(response.body).to.have.property('message', 'User deleted successfully');
    
            done(); // Signal that the test case is complete
          });
      });

      after((done) => {
        db.closeDB()
          .then(() => {
            done(); // Signal that after hook is complete
          })
          .catch((error) => {
            done(error); // Signal that after hook failed with an error
          });
      });
});