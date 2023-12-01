// Tests for the Service API
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); 
require("./Service.test")

describe('CATEGORY API TEST', function() {
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



    it('Add Category ', (done) => { 
        const newCategory = {
            name : "test category"
        };

        request(app)
        .post('/api/categories')
        .send(newCategory)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Category created')
            done(); // Signal that the test case is complete
        }); 
    });



    it('Add Duplicate Category ', (done) => { 
        const newCategory = {
            name : "test category"
        };

        request(app)
        .post('/api/categories')
        .send(newCategory)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
            done(); // Signal that the test case is complete
        }); 
    });



    it('Get Categories', (done) => { 
        request(app)
        .get(`/api/categories`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array')
            expect(response.body.length).to.equal(25)

            done(); // Signal that the test case is complete
        }); 
      
    });



    it('Create Service for Category ', (done) => { 
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



    it('Add Service to Category ', (done) => { 
        request(app)
        .put(`/api/categories/${'test category'}/add-service/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Service added to category')

            done(); // Signal that the test case is complete
        }); 
    });



    it('Add Service to non-existent Category ', (done) => { 
        request(app)
        .put(`/api/categories/${'fake'}/add-service/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Category not found')

            done(); // Signal that the test case is complete
        }); 
    });



    it('Get services for Category', (done) => { 
        request(app)
        .get(`/api/categories/${'test category'}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array')
            expect(response.body.length).to.equal(1)

            done(); // Signal that the test case is complete
        }); 
      
    });



    it('Get services for non-existent Category', (done) => { 
        request(app)
        .get(`/api/categories/${'fake category'}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Category not found')
           

            done(); // Signal that the test case is complete
        }); 
      
    });



    it('Remove Service from category', (done) => { 
        request(app)
        .delete(`/api/categories/${'test category'}/remove-service/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Service removed from category')
           

            done(); // Signal that the test case is complete
        }); 
    });



    it('Remove  non-existent Service from category', (done) => { 
        request(app)
        .delete(`/api/categories/${'test category'}/remove-service/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Service not found in the category')

            done(); // Signal that the test case is complete
        }); 
    });
    


    it('Remove Service from non-existent', (done) => { 
        request(app)
        .delete(`/api/categories/${'fake'}/remove-service/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Category not found')

            done(); // Signal that the test case is complete
        }); 
    });



    it('Delete Created Category', (done) => {
        request(app)
        .delete(`/api/categories`)
        .send({name : 'test category'})
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Categories deleted')
          
            done(); // Signal that the test case is complete
        });
    });



    it('Delete non-existent Category', (done) => {
        request(app)
        .delete(`/api/categories`)
        .send({name : 'fake category'})
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('No categories found with the given name')
            
            done(); // Signal that the test case is complete
        });
    });



    it('Delete created service', (done) => {
        request(app)
        .delete(`/api/services/${id}`)
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



    it('Delete user', (done) => {
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

    it('Trying to add service to catagory when db is closed - should catch and throw 500 error', (done) => { 
        db.closeDB()
        request(app)
        .put(`/api/categories/${'test category'}/add-service/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
            expect(response.body.message).to.equal('Internal server error')
            

            done(); // Signal that the test case is complete
        }); 
    });

    it('Trying to get category when db is closed - should catch and throw 500 error', (done) => { 
        db.closeDB()
        request(app)
        .get(`/api/categories`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }
            expect(response.status).to.equal(500);
            expect(response.body.message).to.equal('Internal server error')

            done(); // Signal that the test case is complete
        }); 
      
    });

    it('Trying to get service when db is closed - should catch and throw 500 error', (done) => { 
        db.closeDB()
        request(app)
        .get(`/api/categories/${'test category'}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
            expect(response.body.message).to.equal('Internal server error')

            done(); // Signal that the test case is complete
        }); 
      
    });



    it('Trying to remove service from category when db is closed - should catch and throw 500 error', (done) => { 
        db.closeDB()
        request(app)
        .delete(`/api/categories/${'test category'}/remove-service/${id}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }
            expect(response.status).to.equal(500);

           

            done(); // Signal that the test case is complete
        }); 
    });

    

    it('Trying to delete created category when db is closed - should catch and throw 500 error', (done) => { 
        db.closeDB()
        request(app)
        .delete(`/api/categories`)
        .send({name : 'test category'})
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                return done(err); // Signal that the test case failed with an error
            }

            expect(response.status).to.equal(500);
          
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