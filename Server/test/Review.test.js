const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); 
//require("./User.test")
//require("./Service.test")

describe('REVIEW API TEST', function() {
    let id;
    let user_id;
    let service_id;
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

    it('Add service for created user and review', (done) => { 
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

          service_id = response.body._id;

          done(); // Signal that the test case is complete
      });   
  });

            
    it('Create a review with the created used', (done) => {
        const newReview = {
            reviewer: user_id,
            service: service_id,
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
            expect(response.body).to.have.property('service', service_id);
            expect(response.body).to.have.property('text', 'This is a test review');
            expect(response.body).to.have.property('updated');

            id = response.body._id;
            
            done(); // Signal that the test case is complete
        });
    });

    it('Get review by ID', (done) => {
        request(app)
        .get(`/api/reviews/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }
  
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('reviewer', user_id);
          expect(response.body).to.have.property('rating', 5);
          expect(response.body).to.have.property('service', service_id);
          expect(response.body).to.have.property('text', 'This is a test review');
          expect(response.body).to.have.property('updated');
  
          done(); // Signal that the test case is complete
        });
    });

    it('Get reviews by service ID', (done) => {
        request(app)
        .get(`/api/reviews/service/${service_id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }
        
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array').with.lengthOf(1);
          expect(response.body[0]).to.have.property('reviewer', user_id);
          expect(response.body[0]).to.have.property('rating', 5);
          expect(response.body[0]).to.have.property('service', service_id);
          expect(response.body[0]).to.have.property('text', 'This is a test review');
          expect(response.body[0]).to.have.property('updated');
        
          done(); // Signal that the test case is complete
        });
    });

    it('Get reviews by service ID with invalid id', (done) => {
        request(app)
        .get('/api/reviews/service/123')
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

    it ('Get a reviews by user with invalid id', (done) => {
        request(app)
        .get('/api/reviews/user/123')
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Invalid user ID');

          done(); // Signal that the test case is complete
        });
    });

    it('Edit review', (done) => {
        const updatedReview = {
            rating: 4,
            text: 'This is an updated test review'
        };

        request(app)
        .put(`/api/reviews/${id}`)
        .send(updatedReview)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
            return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Review updated successfully');

            done(); // Signal that the test case is complete
        });
      });


    it('Edit review with invalid id', (done) => {
        const updatedReview = {
            rating: 4,
            text: 'This is an updated test review'
        };
      
        request(app)
        .put('/api/reviews/123')
        .send(updatedReview)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Invalid review ID');

          done(); // Signal that the test case is complete
        });
    });

    it('Delete review with invalid id', (done) => {
        request(app)
        .delete('/api/reviews/123')
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Invalid review ID');

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

    it ('Get a deleted review by service ID', (done) => {
        request(app)
        .get(`/api/reviews/service/${service_id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }

          expect(response.status).to.equal(404);
          expect(response.body).to.have.property('message', 'Reviews not found');
          
          done(); // Signal that the test case is complete
        });
    });

    it ('Get a deleted review by user ID', (done) => {
        request(app)
        .get(`/api/reviews/user/${user_id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }

          expect(response.status).to.equal(404);
          expect(response.body).to.have.property('message', 'Reviewer not found');

          done(); // Signal that the test case is complete
        });
    });

    it('Delete service', (done) => {
        request(app)
        .delete(`/api/services/${service_id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }
          
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message', 'Service deleted successfully');

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

    it('Get a deleted review by ID', (done) => {
        request(app)
        .get(`/api/reviews/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }
  
          expect(response.status).to.equal(404);
          expect(response.body).to.have.property('message', 'Review not found');
  
          done(); // Signal that the test case is complete
        });
    });

    it('Edit a deleted review', (done) => {
        const updatedReview = {
            rating: 4,
            text: 'This is an updated test review'
        };

        request(app)
        .put(`/api/reviews/${id}`)
        .send(updatedReview)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
            return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('message', 'Review not found');

            done(); // Signal that the test case is complete
        });
    });

    it('Delete a deleted review', (done) => {
        request(app)
        .delete(`/api/reviews/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }
  
          expect(response.status).to.equal(404);
          expect(response.body).to.have.property('message', 'Review not found');
  
          done(); // Signal that the test case is complete
        });
    });

    it('Get a deleted review with invalid id', (done) => {
        request(app)
        .get('/api/reviews/123')
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            return done(err); // Signal that the test case failed with an error
          }
  
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Invalid review ID');
  
          done(); // Signal that the test case is complete
        });
    });

    it('Try to create a review after db is closed - should throw and catch 500 error', (done) => {
        const newReview = {
            reviewer: user_id,
            rating: 5,
            text: 'This is a test review'
        };

        db.closeDB()
        request(app)
        .post('/api/reviews')
        .send(newReview)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
              return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('message', 'Internal server error');

            done(); // Signal that the test case is complete
        });
    });

    it('Try to get a review after db is closed - should throw and catch 500 error', (done) => {
        db.closeDB()
        request(app)
        .get(`/api/reviews/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
              return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('message', 'Internal server error');

            done(); // Signal that the test case is complete
        });
    });

    it('Try to edit a review after db is closed - should throw and catch 500 error', (done) => {
        const updatedReview = {
            rating: 4,
            text: 'This is an updated test review'
        };

        db.closeDB()
        request(app)
        .put(`/api/reviews/${id}`)
        .send(updatedReview)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
              return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('message', 'Internal server error');

            done(); // Signal that the test case is complete
        });
    });

    it('Try to get reviews by service ID after db is closed - should throw and catch 500 error', (done) => {
        db.closeDB()
        request(app)
        .get(`/api/reviews/service/${service_id}`)
        .set('Accept', 'application/json')

        .end((err, response) => {
            if (err) {
              return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('message', 'Internal server error');

            done(); // Signal that the test case is complete
        });
    });

    it('Try to delete a review after db is closed - should throw and catch 500 error', (done) => {  
        db.closeDB()
        request(app)
        .delete(`/api/reviews/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
              return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('message', 'Internal server error');

            done(); // Signal that the test case is complete
        });
    });

    it('Try to get reviews by user ID after db is closed - should throw and catch 500 error', (done) => {
        db.closeDB()
        request(app)
        .get(`/api/reviews/user/${user_id}`)
        .set('Accept', 'application/json')

        .end((err, response) => {
            if (err) {
              return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('message', 'Internal server error');

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