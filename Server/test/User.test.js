const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const connectDB = require('../Config/db')
const app = require('../app'); // Replace with the path to your Express app

describe('User API TEST', () => {
  before((done) => {
    connectDB()
      .then(() => {
        done(); // Signal that before hook is complete
      })
      .catch((error) => {
        done(error); // Signal that before hook failed with an error
      });
  });

  it('Create a user', (done) => {
    const newUser = {
      name: 'testuser',
      email: 'test@email.com',
      password: 'testpassword',
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
        expect(response.body).to.have.property('name', 'testuser');
        done(); // Signal that the test case is complete
      });
  });

  it('should fetch a list of users', (done) => {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          return done(err); // Signal that the test case failed with an error
        }

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        // Add more assertions based on your API response structure

        done(); // Signal that the test case is complete
      });
  });
});