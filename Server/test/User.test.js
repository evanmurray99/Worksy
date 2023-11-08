const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); 
const User = require('../Models/User')


describe('USER API TEST', () => {
  let id;
  let token;
  let service_id
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
    
          id = response.body._id;
          
        done(); // Signal that the test case is complete
      });
  });

  it('Get created user', (done) => {
  
    request(app)
    .get(`/api/users/${id}`)
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




  it('Update user Bio', (done) => {
    
    request(app)
      .put(`/api/users/${id}/update-bio`)
      .send({ bio: 'User Bio updated' })
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('bio', 'User Bio updated');


        done(); // Signal that the test case is complete
      });
  });

  it('Update user bio with invalid id', (done) => {

    request(app)
      .put(`/api/users/${id + 'x'}/update-bio`)
      .send({ bio: 'User Bio updated' })
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }
          
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid user ID');
  
        done(); // Signal that the test case is complete
      });
  });

  it('Update user', (done) => {
    
    request(app)
      .put(`/api/users/${id}/update-user`)
      .send({ firstName : 'newTest', lastName : 'newUser' , email :  "testuser@myumanitoba.ca", password : "testpassword"})
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('User updated successfully');
        // Add more assertions based on your API response structure

        done(); // Signal that the test case is complete
      });
  });

  it('Update user', (done) => {
    
    request(app)
      .put(`/api/users/${id}/update-user`)
      .send({ firstName : 'newTest', lastName : 'newUser' , email :  "testuser@myumanitoba.ca", password : "new"})
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('User updated successfully');
        // Add more assertions based on your API response structure

        done(); // Signal that the test case is complete
      });
  });


  it("Testing login", (done) => {
    const user = {
      email: 'testuser@myumanitoba.ca',
      password: 'new',
    };

    request(app)
      .post('/api/users/login')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');

        token = response.body.token;

        done(); // Signal that the test case is complete
      });
  });

  it("Testing login for non-existent user", (done) => {
    const user = {
      email: 'fakeuser@myumanitoba.ca',
      password: 'testpassword',
    };

    request(app)
      .post('/api/users/login')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }
        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('message', 'User not found');
        done(); // Signal that the test case is complete
      });
  });

  it("Testing login with invalid password", (done) => {
    const user = {
      email: 'testuser@myumanitoba.ca',
      password: 'wrongpassword',
    };

    request(app)
      .post('/api/users/login')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Invalid password');
        done(); // Signal that the test case is complete
      });
  });
  

  it ("Testing get user with invalid token", (done) => {

    request(app)
      .get(`/api/users/${token + 'x'}/auth`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }
        
        expect(response.status).to.equal(500);
        expect(response.body).to.have.property('success', false);
        done(); // Signal that the test case is complete
      });
  });

  it ("Testing get user by token", (done) => {
    request(app)
    .get(`/api/users/${token}/auth`)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        return done(err); // Signal that the test case failed with an error
      }
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('success', true);
      expect(response.body.user).to.have.property('_id', id);

      done(); // Signal that the test case is complete
    });
  });


  it('Create a service for user ', (done) => { 
    const newService = {
        seller : id,
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
        expect(response.body).to.have.property('seller', id); 

        service_id = response.body._id;

        done(); // Signal that the test case is complete
    });   
});



it ('Add Service to User', (done) => {
    request(app)

    .put(`/api/users/${id}/add-service/${service_id}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
        if (err) {
            return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        
        done(); // Signal that the test case is complete
    });
});

it ('Get services by user', (done) => {
  request(app)

  .get(`/api/users/services/${id}`)
  .set('Accept', 'application/json')
  .end((err, response) => {
      if (err) {
          return done(err); // Signal that the test case failed with an error
      }

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(1)
      
      done(); // Signal that the test case is complete
  });
});

it ('Delete created service', (done) => {
    request(app)
    .delete(`/api/services/${service_id}`)
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

  it('Delete user', (done) => {
    

    // Send a DELETE request to delete the user by ID
    request(app)
      .delete(`/api/users/${id}`)
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

  it('Delete already deleted user', (done) => {
    request(app)
    .delete(`/api/users/${id}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        return done(err); // Signal that the test case failed with an error
      }

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('User not found');

      done(); // Signal that the test case is complete
    });
  });

  it ('Delete user with invalid id', (done) => {
    request(app)
    .delete(`/api/users/${id + 'x'}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
        if (err) {
            return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid user ID');

        done(); // Signal that the test case is complete
    });
  });

  it('Update user bio after user has been deleted', (done) => {
    
    request(app)
      .put(`/api/users/${id}/update-bio`)
      .send({ bio: 'User Bio updated' })
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('User not found');
   


        done(); // Signal that the test case is complete
      });
  })

  it('Update user after it has been deleted', (done) => {
    
    request(app)
      .put(`/api/users/${id}/update-user`)
      .send({ firstName : 'newTest', lastName : 'newUser' , email :  "testuser@myumanitoba.ca"})
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('User not found');

        done(); // Signal that the test case is complete
      });
  });

  it('Get user by token after user has been deleted', (done) => {
    request(app)
    .get(`/api/users/${token}/auth`)
    .set('Accept', 'application/json')
    .end((err, response) => {

      if (err) {
        return done(err); // Signal that the test case failed with an error
      }
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('Unauthorized User');

      done(); // Signal that the test case is complete
    });
  });



  it ('Get services for deleted user', (done) => {
    request(app)

    .get(`/api/users/services/${id}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
        if (err) {
            return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('User not found');
        
        done(); // Signal that the test case is complete
    });
});

  it('Get already deleted user', (done) => {
    request(app)
    .get(`/api/users/${id}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        return done(err); // Signal that the test case failed with an error
      }

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('User not found');

      done(); // Signal that the test case is complete
    });
  });



  it('Add service to deleted user', (done) => {
    request(app)

    .put(`/api/users/${id}/add-service/${service_id}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
        if (err) {
            return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('User not found');
        
        done(); // Signal that the test case is complete
    });
  });

  it('Try to get user after db has been closed - should throw and catch 500 error ', (done) => {
    db.closeDB()
    request(app)
    .get(`/api/users/${id}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        return done(err); // Signal that the test case failed with an error
      }

      expect(response.status).to.equal(500);
      expect(response.body.message).to.equal('Internal server error');

      done(); // Signal that the test case is complete
    });
  });

  it('Try to add service after db has been closed - should throw and catch 500 error ', (done) => {
    db.closeDB()
    request(app)

    .put(`/api/users/${id}/add-service/${service_id}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
        if (err) {
            return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(500);
        expect(response.body.message).to.equal('Internal server error');
        
        done(); // Signal that the test case is complete
    });
  });



  it('Try to create user after db has been closed - should throw and catch 500 error ', (done) => {
    db.closeDB()
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

        expect(response.status).to.equal(500);
          
        done(); // Signal that the test case is complete
      });
  });


  it('Try to edit user after db has been closed - should throw and catch 500 error ', (done) => {
    db.closeDB()
    request(app)
    .put(`/api/users/${id}/update-user`)
    .send({ firstName : 'newTest', lastName : 'newUser' , email :  "testuser@myumanitoba.ca", password : "testpassword"})
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        return done(err); // Signal that the test case failed with an error
      }

      expect(response.status).to.equal(500);
      expect(response.body.message).to.equal('Internal server error');

      done(); // Signal that the test case is complete
    });
  });

  it('Try to delete user after db has been closed - should throw and catch 500 error ', (done) => {
    db.closeDB()
    request(app)
    .delete(`/api/users/${id}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        return done(err); // Signal that the test case failed with an error
      }

      expect(response.status).to.equal(500);
      expect(response.body.message).to.equal('Internal server error');

      done(); // Signal that the test case is complete
    });
  });

  it('Try to update user bio after db has been closed - should throw and catch 500 error ', (done) => {
    db.closeDB()
  
    request(app)
    .put(`/api/users/${id}/update-bio`)
    .send({ bio: 'User Bio updated' })
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        return done(err); // Signal that the test case failed with an error
      }

      expect(response.status).to.equal(500);
      expect(response.body.message).to.equal('Internal server error');

      done(); // Signal that the test case is complete
    });
  });

  it('Try to login after db has been closed - should throw and catch 500 error ', (done) => {
    db.closeDB()

    const user = {
      email: 'testuser@myumanitoba.ca',
      password: 'testpassword',
    };

    request(app)
    .post('/api/users/login')
    .send(user)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        return done(err); // Signal that the test case failed with an error
      }
      expect(response.status).to.equal(500);
      expect(response.body.message).to.equal('Internal server error');

      done(); // Signal that the test case is complete
    });
  });

  it("Try to get services by user after db has been closed - should throw and catch 500 error ", (done) => {
    db.closeDB()
    request(app)
      .get(`/api/users/services/${id}`)
      .set('Accept', 'application/json')
      .end((err, response) => {
          if (err) {
              return done(err); // Signal that the test case failed with an error
          }

          expect(response.status).to.equal(500);
          expect(response.body.message).to.equal('Internal server error');
          
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