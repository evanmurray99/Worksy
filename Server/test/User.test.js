const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const connectDB = require('../Config/db')
const app = require('../app'); // Replace with the path to your Express app

describe('User API TEST', () => {
  before(async () => {
    
    await connectDB('test');
  })


  it('Create a user', async () => {
    const newUser = {
      name: 'testuser',
      email : 'test@email.com',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('name', 'testuser');
  });

  it('should fetch a list of users', async () => {
    const response = await request(app).get('/api/users').set('Accept', 'application/json');

    expect(response.status).to.equal(200);
    console.log(response.body)
    expect(response.body).to.be.an('array');
    // Add more assertions based on your API response structure
  });
});