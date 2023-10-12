const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); // Replace with the path to your Express app


describe('USER API TEST', () => {
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
        // Add more assertions based on your API response structure

        done(); // Signal that the test case is complete
      });
  });

  // it('Delete user', (done) => {
    

  //   // Send a DELETE request to delete the user by ID
  //   request(app)
  //     .delete(`/api/users/${id}`)
  //     .set('Accept', 'application/json')
  //     .end((err, response) => {
  //       if (err) {
  //         return done(err); // Signal that the test case failed with an error
  //       }

  //       if (response.status === 404) {
  //         // If the user is not found (404), it's still a successful deletion
  //         expect(response.status).to.equal(404);
  //       } else {
  //         // If the user is found and deleted (200), it's a successful deletion
  //         expect(response.status).to.equal(200);
  //       }

  //       expect(response.body).to.have.property('message', 'User deleted successfully');

  //       done(); // Signal that the test case is complete
  //     });
  // });

  
});