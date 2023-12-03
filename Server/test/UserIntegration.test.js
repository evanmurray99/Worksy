const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); 
const User = require('../Models/User')
const Service = require('../Models/Service')

describe('User Integration Tests', () => {
  var cleanUpId = []

  before((done) => {
    db.connectDB()
      .then(() => {
        done(); // Signal that before hook is complete
      })
      .catch((error) => {
        done(error); // Signal that before hook failed with an error
      });
  });

  after( async () => {
    // delete everything created.
    for(var i = 0; i < cleanUpId.length; i++)
    {
      if(cleanUpId[i].type === 'user')
      {
        await User.findOneAndDelete({_id: cleanUpId[i].id})
      }
      else
      {
        await Service.findOneAndDelete({_id: cleanUpId[i].id})
      }
    }

    cleanUpId = []
  })

  it('User can get all services that they have created', async() => {
    var currDate = new Date().toLocaleDateString();

    var response = await request(app).post('/api/users/').send({
      firstName: 'Service',
      lastName: 'Provider',
      email: 'service@provider.ca',
      password: 'password',
      isStudent: true
    })
    const serviceTestUser = JSON.parse(response.text)
    cleanUpId.push({type: 'user', id: serviceTestUser._id})

    var response = await request(app).post('/api/users/').send({
      firstName: 'other',
      lastName: 'user',
      email: 'other@test.ca',
      password: 'other',
      isStudent: true
    })
    const otherUser = JSON.parse(response.text)
    cleanUpId.push({type: 'user', id: otherUser._id})

    const createService = async (user, serviceInfo) =>
    {
      var result = await request(app).post('/api/services/').send({
        ...serviceInfo,
        seller: user._id,
      })
 
      result = JSON.parse(result.text)
      await request(app).put('/api/users/' + user._id + '/add-service/' + result._id)

      return result;
    }

    const expectedService1  = await createService(serviceTestUser, 
      {description: 'test description',
      title: 'First',
      price: '100',
      categories: [],
      created: currDate,
      updated: currDate})

    cleanUpId.push({type: 'service', id: expectedService1._id})

    const expectedService2 = await createService(serviceTestUser,
      {description: 'description',
      title: 'Second',
      price: '50',
      categories: [],
      created: currDate,
      updated: currDate})
    
    cleanUpId.push({type: 'service', id: expectedService2._id})

      const hiddenService = await createService(otherUser,
        {description: 'other user',
        title: 'Hidden',
        price: '0',
        categories: [],
        created: currDate,
        updated: currDate})
    
    cleanUpId.push({type: 'service', id: hiddenService._id})

    response = await request(app).get(`/api/users/services/${serviceTestUser._id}`)
    const userServices = response._body

    expect(userServices).to.have.length(2)

    expect(userServices[0].title).to.equal(expectedService1.title)
    expect(userServices[1].title).to.equal(expectedService2.title)

    expect(userServices[0].seller).to.equal(serviceTestUser._id)
    expect(userServices[1].seller).to.equal(serviceTestUser._id)
  });

  it('Users can change their password and pass validation.', async() =>{
    var response = await request(app).post('/api/users/').send({
      firstName: 'Non',
      lastName: 'Student',
      email: 'non@student.ca',
      password: 'nonStudent',
      isStudent: false
    })
    
    const nonStudent = JSON.parse(response.text)
    cleanUpId.push({type: 'user', id: nonStudent._id})
    const updatedPassword = 'newPass'

    var updatedUser = await request(app).put('/api/users/' + nonStudent._id + '/update-user').send({
      firstName: nonStudent.firstName,
      lastName: nonStudent.lastName,
      email: nonStudent.email,
      password: updatedPassword
    })

    expect(updatedUser.status).to.equal(200)
    updatedUser = JSON.parse(updatedUser.text)
    expect(updatedUser.message).to.equal('User updated successfully')

    var token = await request(app).post('/api/users/login').send({
			email: nonStudent.email,
			password: updatedPassword})

    expect(token.status).to.equal(200)
    token = JSON.parse(token.text)

    var authorization = await request(app).get('/api/users/' + token.token + '/auth')
    expect(authorization.status).to.equal(200)
  });
})