# 1.	Introduction

## 1.1	 Scope

### Feature 1: Post
Post will allow users to create detailed listings for the products and services they wish to buy or sell. 
Users will be able to include information such as titles, descriptions, prices, and images within their posts.
Each post will serve as a communication hub between the buyers and sellers.

### Feature 2: Account 
 Account will allow users to update or delete postings that they created. 
 Additionally, users will be able to see posts that they have bookmarked as well as chats that they are a part of. 
 This feature will give users the ability to control what information they reveal to other users and allow them to maintain and control their privacy on the application. 
 The account will contain minimal personal information such as First name, Last name, email, username, and password in addition to their posts, chat history, and reviews that they have posted.

### Feature 3: Search  
Search will allow users to find the products or services that they are looking for. 
Users will be able to filter their searches by applying price ranges, locations, categories, conditions, and more. 
Users will also be able to sort search results based on relevance, price, ratings, and age of listings.

### Feature 4: Chat
Chat will be able to support one-on-one messaging. Chats will be accessed within a post so users can create a chat with the posts creator in one click to start a conversation. Then once the chat is created you will be able to send and receive messages to and from the post creator. 
There will also be one central location where you can view all of your ongoing chats so that they are easy to find. Messages are only sent to the accounts that are linked to the chatroom and not to any other accounts.

### Feature 5: Load balancing 
load balancing to help meet the non-functional requirement of being able to respond to 100 users placing 1,000 requests per minute.
This feature is critical for our application to function in a real-world setting as it would need to be able to handle hundreds of users and thousands of requests in order for it to be practical.

### Feature 6: Review 
The review feature gives the users a chance to rate the finished product that they receive. 
The Review feature will contain both a rating and a comment component. The rating will be based on a five-star system in which 5 stars is the best possible rating with 1 star being the worst. 
The comment feature will be free-form with a character restriction of 255 characters. In a post at a quick glance of the review feature, you will be able to see the average rating along with a breakdown of how many ratings of 1, 2, 3, 4, and 5 stars. 
In addition, you will see the comments and ratings of all reviews connected to the corresponding post from newest to oldest.

## 1.2	Roles and Responsibilities 

| **Name** | **Net ID** | **GitHub Username** | **Role** |
|----------|------------|---------------------|----------|
| Casandra | haywardc   | chayward3113        | Front-end Developer,  Concept Artist         |
| Diljot   | singhd18   | Dilpunjab           | Front-end Developer         |
| Evan     | murraye2   | evanmurray99        | Back-end Developer,  Code Reviewer         |
| Noel     | omeizan    | omeizan             | Back-end Developer,  Code Reviewer         |
| Tung     | nguye49    | xuaantung           | Front-end Developer,  Code Reviewer       |  

# 2	Test Methodology

## 2.1	Test Levels

### Feature 1: Post

#### Unit Tests:

1. **Create a user**:
   - This test creates a new user by sending a POST request to the "/api/users" endpoint.
   - It expects a response with an HTTP status code of 201 (indicating a successful creation).
   - Validates the response body for specific properties, such as the user's first name and last name.
   - Stores the user's ID from the response for later tests.

2. **Add service for created user**:
   - This test adds a service for the user created in the previous test by sending a POST request to the "/api/services" endpoint.
   - It expects a response with an HTTP status code of 201 (indicating a successful creation).
   - Validates the response body for specific properties of the created service.
   - Stores the service ID from the response for later tests.

3. **Edit service**:
   - This test updates the service information by sending a PUT request to the "/api/services/:id" endpoint.
   - It expects a response with an HTTP status code of 200 (indicating success).
   - Validates the response message, which should indicate that the service was updated successfully.

4. **Edit invalid service**:
   - This test attempts to edit a service with an invalid service ID.
   - Sends a PUT request to the "/api/services/:id" endpoint with an ID that doesn't exist.
   - Expects a response with an HTTP status code of 400 (Bad Request) and a specific error message.

5. **Delete Invalid service**:
   - Attempts to delete a service with an invalid service ID by sending a DELETE request to the "/api/services/:id" endpoint.
   - Expects a response with an HTTP status code of 400 (Bad Request) and a specific error message indicating an invalid service ID.

6. **Delete created service**:
   - Deletes a service that was created earlier by sending a DELETE request to the "/api/services/:id" endpoint.
   - Expects a response with an HTTP status code of 200 (indicating success).

7. **Get invalid service**:
   - Tries to retrieve a service with an invalid service ID by sending a GET request to the "/api/services/:id" endpoint.
   - Expects a response with an HTTP status code of 404 (Not Found) and a specific error message indicating that the service was not found.

8. **Delete Already deleted service**:
   - Attempts to delete a service that has already been deleted.
   - Sends a DELETE request to the "/api/services/:id" endpoint with the ID of the previously deleted service.
   - Expects a response with an HTTP status code of 404 (Not Found) and a specific error message indicating that the service was not found.

9. **Delete user**:
   - Deletes the user created earlier by sending a DELETE request to the "/api/users/:id" endpoint.
   - Expects an HTTP status code of either 200 (if the user is found and deleted) or 404 (if the user is not found).
   - Validates the response message, which should indicate a successful user deletion.

#### Integration Tests:

#### Acceptance Tests:

### Feature 2: Account 

#### Unit Tests:
1. **Create a user**:
   - Sends a POST request to create a new user with specified user data.
   - Expects a response with an HTTP status code 201 (Created) and validates the response body.
   - Stores the user's ID for later tests.

2. **Get created user**:
   - Sends a GET request to retrieve the user created in the previous test using the stored user ID.
   - Expects a response with an HTTP status code 200 (OK) and validates the response body.

3. **Update user Bio**:
   - Sends a PUT request to update the bio of the previously created user using the stored user ID.
   - Expects a response with an HTTP status code 200 (OK) and validates the response body.

4. **Update user**:
   - Sends a PUT request to update user information (first name, last name, email, and password) using the stored user ID.
   - Expects a response with an HTTP status code 200 (OK) and validates the response message.

5. **Testing login**:
   - Sends a POST request to perform a user login using the user's email and password.
   - Expects a response with an HTTP status code 200 (OK) and retrieves a user authentication token from the response.

6. **Testing login for non-existent user**:
   - Similar to the previous test but uses invalid credentials for a user that does not exist.
   - Expects a response with an HTTP status code 404 (Not Found).

7. **Testing login with invalid password**:
   - Similar to the login test but uses an incorrect password for an existing user.
   - Expects a response with an HTTP status code 401 (Unauthorized).

8. **Testing get user with invalid token**:
   - Sends a GET request to retrieve user data using an invalid token.
   - Expects a response with an HTTP status code 500 (Internal Server Error).

9. **Testing get user by token**:
   - Sends a GET request to retrieve user data using a valid authentication token.
   - Expects a response with an HTTP status code 200 (OK) and validates the user's data.

10. **Create a service for user**:
    - Sends a POST request to create a service associated with a user.
    - Expects a response with an HTTP status code 201 (Created) and validates the response body.
    - Stores the service ID for later tests.

11. **Add Service to User**:
    - Sends a PUT request to associate the previously created service with the user.
    - Expects a response with an HTTP status code 200 (OK).

12. **Get services by user**:
    - Sends a GET request to retrieve services associated with the user.
    - Expects a response with an HTTP status code 200 (OK) and validates the response data.

13. **Delete created service**:
    - Sends a DELETE request to delete the service created earlier using the stored service ID.
    - Expects a response with an HTTP status code 200 (OK).

14. **Delete user**:
    - Sends a DELETE request to delete the user by ID, which may include cleaning up associated services.
    - Expects either an HTTP status code 200 (OK) or 404 (Not Found) based on whether the user exists.
    - Validates the response message.

15. **Update user**:
    - Repeats the user update test but using the user ID that should not exist after deletion.
    - Expects a response with an HTTP status code 404 (Not Found).

16. **Get services for deleted user**:
    - Repeats the "Get services by user" test but using the user ID that should not exist after deletion.
    - Expects a response with an HTTP status code 404 (Not Found).


#### Integration Tests:

#### Acceptance Tests:

### Feature 3: Search  

#### Unit Tests:

1. **Create a user:**
   - A new user is created with the first name, last name, email, password, and a student status.
   - The test sends a POST request to "/api/users" with the user data.
   - The test expects a successful response (status 201) and verifies that the user data matches the expected values.

2. **Add Category:**
   - A new category with a name is created.
   - The test sends a POST request to "/api/categories" with the category data.
   - The test expects a successful response (status 201) and checks the response message.

3. **Add Duplicate Category:**
   - An attempt is made to add a category with the same name as an existing category.
   - The test expects a response with a conflict status (status 500).

4. **Get Categories:**
   - The test retrieves a list of categories by sending a GET request to "/api/categories."
   - It expects a successful response (status 200) and verifies that the response contains an array with at least one category.

5. **Create Service for Category:**
   - A new service is created and associated with a specific category.
   - The test sends a POST request to "/api/services" with the service data and the specified category.
   - It expects a successful response (status 201) and verifies the service details.

6. **Add Service to Category:**
   - The service is added to a category.
   - The test sends a PUT request to associate the service with the category.
   - It expects a successful response (status 200) and checks the response message.

7. **Add Service to non-existent Category:**
   - An attempt is made to add a service to a category that does not exist.
   - The test sends a PUT request and expects a response with a status of 404 and an appropriate error message.

8. **Get Services for Category:**
   - The test retrieves a list of services associated with a specific category.
   - It sends a GET request to "/api/categories/{categoryName}" and expects a successful response (status 200) with an array of services.

9. **Get Services for non-existent Category:**
   - An attempt is made to retrieve services for a category that does not exist.
   - The test sends a GET request and expects a response with a status of 404 and an appropriate error message.

10. **Remove Service from Category:**
    - The test attempts to remove a service from a category.
    - It sends a DELETE request to disassociate the service from the category.
    - Expects a successful response (status 200) and checks the response message.

11. **Remove non-existent Service from Category:**
    - An attempt is made to remove a service that does not exist from a category.
    - The test sends a DELETE request and expects a response with a status of 404 and an appropriate error message.

12. **Remove Service from non-existent Category:**
    - The test tries to remove a service from a category that does not exist.
    - It sends a DELETE request and expects a response with a status of 404 and an appropriate error message.

13. **Delete Created Category:**
    - A category with a specific name is deleted.
    - The test sends a DELETE request to "/api/categories" with the category name.
    - Expects a successful response (status 200) and checks the response message.

14. **Delete non-existent Category:**
    - An attempt is made to delete a category that does not exist.
    - The test sends a DELETE request and expects a response with a status of 404 and an appropriate error message.

15. **Delete created service:**
    - The test attempts to delete a service that was previously created.
    - It sends a DELETE request to "/api/services/{id}" and expects a successful response (status 200).

16. **Delete user:**
    - The test deletes the user account that was created in the initial test.
    - It sends a DELETE request to "/api/users/{userId}" and expects a successful response (status 200 or 404).

17. **After Hook:**
    - The database connection is closed in the after hook, signaling the completion of the tests.

#### Integration Tests:

#### Acceptance Tests:

### Feature 4: Chat

#### Unit Tests:

#### Integration Tests:

#### Acceptance Tests:

### Feature 5: Load balancing 

#### Unit Tests:

#### Integration Tests:

#### Acceptance Tests:

### Feature 6: Review 

#### Unit Tests:

#### Integration Tests:

#### Acceptance Tests:

## 2.2	Test Completeness

Testing will be complete when:  
- 80% test coverage
- All automated and manual test cases are executed successfully
- 100% test coverage for the backend 




# 3	Resource & Environment Needs

## 3.1	Testing Tools

### General Tools/Methods:
- Github Actions for automated testing
- Github Issues and Projects for bug tracking
- IDE debugger such as VSCode Debugger

### Front-end:
- Libraries:
  - React Testing Library
  - React Test Renderer
  - Jest

### Back-end:
- Libraries:
  - Chai
  - Mocha
  - Nyc
  - Supertest
 
## 3.2	Test Environment
### The minimum hardware requirements that will be used to test the Application:
- Machine running operating system
  - Windows 10 or above
  - MacOS
  
### The following software’s are required in addition to client-specific software:
- Node JS v18.12.1
- 


# 4	Terms/Acronyms 

| TERM/ACRONYM | DEFINITION                    |
|--------------|-------------------------------|
| API          | Application Program Interface |
| AUT          | Application Under Test        |
| QA           | Quality Assurance             |
| UI           | User Interface                |

