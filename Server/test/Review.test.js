const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); 
require("./User.test")

describe('REVIEW API TEST', function() {
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
            //expect(response.body).to.have.property('firstName', 'Test');
        
            user_id = response.body._id;
              
            done(); // Signal that the test case is complete
          });
      });

    it('Create a review with the created used', (done) => {
        const newReview = {
            reviewer: user_id,
            rating: 5,
            text: 'This is a test review'
        };

        request(app)
        .post('/api/reviews')
        .send(newReview)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
            return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('reviewer', user_id);
            expect(response.body).to.have.property('rating', 5);
            expect(response.body).to.have.property('text', 'This is a test review');
            expect(response.body).to.have.property('updated');

            id = response.body._id;
            
            done(); // Signal that the test case is complete
        });
    });

    it('Delete review', (done) => { 
        request(app)
          .delete(`/api/reviews/${id}`)
          .set('Accept', 'application/json')
          .end((err, response) => {
            if (err) {
              return done(err); // Signal that the test case failed with an error
            }
    
            if (response.status === 404) {
              // If the review is not found (404), it's still a successful deletion
              expect(response.status).to.equal(404);
            } else {
              // If the review is found and deleted (200), it's a successful deletion
              expect(response.status).to.equal(200);
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Review deleted successfully');
    
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


            expect(response.status).to.equal(200);
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