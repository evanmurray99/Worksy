const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); 
const e = require('express');
require("./User.test")

describe('CHAT API TEST', function() {
    let seller_id;
    let buyer_id;
    let service_id;
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


    it('Create a seller', (done) => {
        const newUser = {
            firstName: 'seller',
            lastName : 'User',
            email: 'selleruser@myumanitoba.ca',
            password: 'sellerpassword',
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
        expect(response.body).to.have.property('firstName', 'seller');
    
        seller_id = response.body._id;
            
        done(); // Signal that the test case is complete
        });
    });


    it('Create a buyer', (done) => {
        const newUser = {
            firstName: 'buyer',
            lastName : 'User',
            email: 'buyereruser@myumanitoba.ca',
            password: 'buyerpassword',
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
            expect(response.body).to.have.property('firstName', 'buyer');
        
            buyer_id = response.body._id;
            
            done(); // Signal that the test case is complete
        });
    });



    it('Create Service', (done) => { 
        const newService = {
            seller : seller_id,
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
            expect(response.body).to.have.property('seller', seller_id); 

            service_id = response.body._id;

            done(); // Signal that the test case is complete
        });   
    });


    it('Create a chat', (done) => {
        const newChat = {
            seller: seller_id,
            buyer: buyer_id,
            service: service_id,
        };

        request(app)
        .post('/api/chats')
        .send(newChat)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }
    
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('seller', seller_id);
            expect(response.body).to.have.property('buyer', buyer_id);
            expect(response.body).to.have.property('service', service_id);
        
            id = response.body._id;
            
            done(); // Signal that the test case is complete
        });
    });

    
    it('Get chat by id', (done) => {
        request(app)
        .get(`/api/chats/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('seller', seller_id);
            expect(response.body).to.have.property('buyer', buyer_id);
            expect(response.body).to.have.property('service', service_id);

            done(); // Signal that the test case is complete
        });
    });

    it('Get chats by seller id', (done) => {
        request(app)
        .get(`/api/chats/seller/${seller_id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');

            done(); // Signal that the test case is complete
        });
    });

    it('Get chats by buyer id', (done) => { 
        request(app)
        .get(`/api/chats/buyer/${buyer_id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');

            done(); // Signal that the test case is complete
        });
    });


    it('Add message to chat', (done) => {
        const newMessage = {
            sender: seller_id,
            body: "test content",
        };

        request(app)
        .put(`/api/chats/${id}`)
        .send(newMessage)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err);
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Message added to chat');

            done();
        });
    });


    it('Get chat by id after adding message', (done) => {
        request(app)
        .get(`/api/chats/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err);
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('seller', seller_id);
            expect(response.body).to.have.property('buyer', buyer_id);
            expect(response.body).to.have.property('service', service_id);
            expect(response.body).to.have.property('messages');

            console.log(response.body.messages);

            done();
        });
    });



    it('Delete created chat', (done) => {
        request(app)
        .delete(`/api/chats/${id}`)
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


    it('Delete created service', (done) => {
        request(app)
        .delete(`/api/services/${service_id}`)
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



    it('Delete created buyer', (done) => {
        request(app)
        .delete(`/api/users/${buyer_id}`)
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

    it('Delete created seller', (done) => {
        request(app)
        .delete(`/api/users/${seller_id}`)
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