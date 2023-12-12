# TEST PLAN FOR WORKSY

ChangeLog 

| Version | Change Date  | By   | Description          |
|---------|--------------|------|----------------------|
| 1.0.0   | Oct, 19 2023 | Evan | Initial Testing Plan |
| 2.0.0   | Nov, 16 2023 |Diljot|Acceptance, Regression|
| 3.0.0   | Dec, 12 2023 | Evan |    Final testing plan|


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

### Feature 1: Post/Service

#### Unit Tests:

1. **Create a user**
   - Description: Creates a new user.
   - Assertions:
     - Status code should be 201 (Created).
     - Response body should have properties 'firstName', 'lastName', 'email', 'password', and 'isStudent'.

2. **Add service for created user**
   - Description: Adds a new service for the created user.
   - Assertions:
     - Status code should be 201 (Created).
     - Response body should have properties 'title', 'description', 'price', 'seller', and 'categories'.

3. **Search for service**
   - Description: Searches for services based on a keyword.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should be an array.
     - The first result in the array should have a 'score' property equal to 3.

4. **Get service by ID**
   - Description: Retrieves a service by its ID.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should have properties 'title', 'description', 'price', 'seller', 'categories', 'rating', and 'reviews'.

5. **Edit service**
   - Description: Edits an existing service.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should have property 'message' equal to 'Service updated successfully'.

6. **Get all services**
   - Description: Retrieves all services.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should be an array.
     - The first service in the array should have a 'title' property equal to 'changed title'.

7. **Edit service with invalid ID**
   - Description: Attempts to edit a service with an invalid ID.
   - Assertions:
     - Status code should be 400 (Bad Request).
     - Response body should have property 'message' equal to 'Invalid service ID'.

8. **Delete service with invalid ID**
   - Description: Attempts to delete a service with an invalid ID.
   - Assertions:
     - Status code should be 400 (Bad Request).
     - Response body should have property 'message' equal to 'Invalid service ID'.

9. **Delete created service**
   - Description: Deletes the service created earlier.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should be an object.
     - The response body should have a property 'message' equal to 'Service deleted successfully'.

10. **Get invalid service**
    - Description: Attempts to retrieve a deleted service.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Service not found'.

11. **Delete already deleted service**
    - Description: Attempts to delete an already deleted service.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Service not found'.

12. **Edit already deleted service**
    - Description: Attempts to edit an already deleted service.
    - Assertions:
      - Status code should be 404 (Not Found).

13. **Delete user**
    - Description: Deletes the created user.
    - Assertions:
      - Status code should be either 200 (OK) or 404 (Not Found) depending on whether the user is found or not.
      - If the user is found (200), response body should have property 'message' equal to 'User deleted successfully'.
      - If the user is not found (404), it's still a successful deletion.

14. **Try to get a service when the database is closed**
    - Description: Attempts to retrieve a service after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).

15. **Try to add a service for created user when the database is closed**
    - Description: Attempts to add a service for the created user after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).

16. **Try to delete created service when the database is closed**
    - Description: Attempts to delete the created service after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).

17. **Try to search for service when the database is closed**
    - Description: Attempts to search for services after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).

18. **Try to edit created service when the database is closed**
    - Description: Attempts to edit the created service after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).

19. **Try to get all services when the database is closed**
    - Description: Attempts to retrieve all services after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).

#### Integration Tests:

1. **User can find all services for a category**
   - Description: Tests the ability of a user to find all services associated with a specific category.
   - Assertions:
     - Deletes the service with no categories and expects a 404 status when trying to disassociate it from the "Fashion" category.
     - Iterates through all categories and retrieves services for each category, checking if the returned services include the expected categories and count.

2. **User can find all reviews by service**
   - Description: Tests the ability of a user to find all reviews associated with a specific service.
   - Assertions:
     - Creates multiple users and reviews for different services.
     - Retrieves all reviews for each service and checks if the returned reviews match the expected reviews, including user IDs, ratings, and comments.
     - Deletes the second user and all created reviews.

### Feature 2: Account

#### Unit Tests:

1. **Create a user**
   - Description: Tests the creation of a user by sending a POST request to the '/api/users' endpoint.
   - Assertions:
     - Expects the HTTP response status to be 201 (Created).
     - Expects the response body to have the 'firstName' property set to 'Test'.

2. **Get created user**
   - Description: Tests the retrieval of a user by sending a GET request to the '/api/users/:id' endpoint.
   - Assertions:
     - Expects the HTTP response status to be 200 (OK).
     - Expects the response body to be an object.

3. **Update user Bio**
   - Description: Tests the update of user bio by sending a PUT request to the '/api/users/:id/update-bio' endpoint.
   - Assertions:
     - Expects the HTTP response status to be 200 (OK).
     - Expects the response body to be an object with a 'bio' property set to 'User Bio updated'.

4. **Update user bio with invalid id**
   - Description: Tests updating user bio with an invalid user ID.
   - Assertions:
     - Expects the HTTP response status to be 400 (Bad Request).
     - Expects the response body to have a 'message' property set to 'Invalid user ID'.

5. **Update user**
   - Description: Tests updating user information by sending a PUT request to the '/api/users/:id/update-user' endpoint.
   - Assertions:
     - Expects the HTTP response status to be 200 (OK).
     - Expects the response body to have a 'message' property set to 'User updated successfully'.

6. **Testing login**
   - Description: Tests user login by sending a POST request to the '/api/users/login' endpoint.
   - Assertions:
     - Expects the HTTP response status to be 200 (OK).
     - Expects the response body to have a 'token' property.

7. **Testing login for non-existent user**
   - Description: Tests login for a non-existent user.
   - Assertions:
     - Expects the HTTP response status to be 404 (Not Found).
     - Expects the response body to have a 'message' property set to 'User not found'.

8. **Testing login with invalid password**
   - Description: Tests login with an invalid password.
   - Assertions:
     - Expects the HTTP response status to be 401 (Unauthorized).
     - Expects the response body to have a 'message' property set to 'Invalid password'.

9. **Testing get user with invalid token**
   - Description: Tests retrieving a user with an invalid token.
   - Assertions:
     - Expects the HTTP response status to be 500 (Internal Server Error).
     - Expects the response body to have a 'success' property set to false.

10. **Testing get user by token**
    - Description: Tests retrieving a user by a valid token.
    - Assertions:
      - Expects the HTTP response status to be 200 (OK).
      - Expects the response body to have a 'user' property and 'success' property set to true.

11. **Create a service for user**
    - Description: Tests creating a service for a user by sending a POST request to the '/api/services' endpoint.
    - Assertions:
      - Expects the HTTP response status to be 201 (Created).
      - Expects the response body to have properties like 'title', 'description', 'price', and 'seller'.

12. **Add Service to User**
    - Description: Tests adding a service to a user by sending a PUT request to the '/api/users/:id/add-service/:service_id' endpoint.
    - Assertions:
      - Expects the HTTP response status to be 200 (OK).
      - Expects the response body to be an object.

13. **Get services by user**
    - Description: Tests retrieving services for a user by sending a GET request to the '/api/users/services/:id' endpoint.
    - Assertions:
      - Expects the HTTP response status to be 200 (OK).
      - Expects the response body to be an array with a length of 1.

14. **Delete created service**
    - Description: Tests deleting a service by sending a DELETE request to the '/api/services/:service_id' endpoint.
    - Assertions:
      - Expects the HTTP response status to be 200 (OK).
      - Expects the response body to be an object.

15. **Delete user**
    - Description: Tests deleting a user by sending a DELETE request to the '/api/users/:id' endpoint.
    - Assertions:
      - Expects the HTTP response status to be either 200 (OK) or 404 (Not Found).
      - Expects the response body to have a 'message' property indicating success or failure.

16. **Delete already deleted user**
    - Description: Tests deleting a user that has already been deleted.
    - Assertions:
      - Expects the HTTP response status to be 404 (Not Found).
      - Expects the response body to have a 'message' property set to 'User not found'.

17. **Delete user with invalid id**
    - Description: Tests deleting a user with an invalid ID.
    - Assertions:
      - Expects the HTTP response status to be 400 (Bad Request).
      - Expects the response body to have a 'message' property set to 'Invalid user ID'.

18. **Update user bio after user has been deleted**
    - Description: Tests updating user bio after the user has been deleted.
    - Assertions:
      - Expects the HTTP response status to be 404 (Not Found).
      - Expects the response body to have a 'message' property set to 'User not found'.

19. **Update user after it has been deleted**
    - Description: Tests updating user information after the user has been deleted.
    - Assertions:
      - Expects the HTTP response status to be 404 (Not Found).
      - Expects the response body to have a 'message' property set to 'User not found'.

20. **Get user by token after user has been deleted**
    - Description: Tests retrieving a user by token after the user has been deleted.
    - Assertions:
      - Expects the HTTP response status to be 404 (Not Found).
      - Expects the response body to have an 'error' property set to 'Unauthorized User'.

21. **Get services for deleted user**
    - Description: Tests retrieving services for a deleted user.
    - Assertions:
      - Expects the HTTP response status to be 404 (Not Found).
      - Expects the response body to have a 'message' property set to 'User not found'.

22. **Get already deleted user**
    - Description: Tests retrieving a user that has already been deleted.
    - Assertions:
      - Expects the HTTP response status to be 404 (Not Found).
      - Expects the response body to have a 'message' property set to 'User not found'.

23. **Add service to deleted user**
    - Description: Tests adding a service to a deleted user.
    - Assertions:
      - Expects the HTTP response status to be 404 (Not Found).
      - Expects the response body to have a 'message' property set to 'User not found'.

24. **Try to get user after db has been closed**
    - Description: Tests trying to retrieve a user after the database has been closed.
    - Assertions:
      - Expects the HTTP response status to be 500 (Internal Server Error).
      - Expects the response body to have a 'message' property set to 'Internal server error'.

25. **Try to add service after db has been closed**
    - Description: Tests trying to add a service after the database has been closed.
    - Assertions:
      - Expects the HTTP response status to be 500 (Internal Server Error).
      - Expects the response body to have a 'message' property set to 'Internal server error'.

26. **Try to create user after db has been closed**
    - Description: Tests trying to create a user after the database has been closed.
    - Assertions:
      - Expects the HTTP response status to be 500 (Internal Server Error).

27. **Try to edit user after db has been closed**
    - Description: Tests trying to edit a user after the database has been closed.
    - Assertions:
      - Expects the HTTP response status to be 500 (Internal Server Error).
      - Expects the response body to have a 'message' property set to 'Internal server error'.

28. **Try to delete user after db has been closed**
    - Description: Tests trying to delete a user after the database has been closed.
    - Assertions:
      - Expects the HTTP response status to be 500 (Internal Server Error).
      - Expects the response body to have a 'message' property set to 'Internal server error'.

29. **Try to update user bio after db has been closed**
    - Description: Tests trying to update user bio after the database has been closed.
    - Assertions:
      - Expects the HTTP response status to be 500 (Internal Server Error).
      - Expects the response body to have a 'message' property set to 'Internal server error'.

30. **Try to login after db has been closed**
    - Description: Tests trying to login after the database has been closed.
    - Assertions:
      - Expects the HTTP response status to be 500 (Internal Server Error).
      - Expects the response body to have a 'message' property set to 'Internal server error'.

31. **Try to get services by user after db has been closed**
    - Description: Tests trying to retrieve services by user after the database has been closed.
    - Assertions:
      - Expects the HTTP response status to be 500 (Internal Server Error).
      - Expects the response body to have a 'message' property set to 'Internal server error'.

#### Integration Tests:

1. **User can get all services that they have created**
   - Description: Tests that a user can retrieve all services they have created.
   - Assertions:
     - Creates two users: `serviceTestUser` and `otherUser`.
     - Defines a function `createService` to create services associated with a user and adds each service ID to `cleanUpId`.
     - Creates three services: `expectedService1`, `expectedService2` for `serviceTestUser`, and `hiddenService` for `otherUser`.
     - Retrieves services associated with `serviceTestUser` and checks if the expected services are present.
     - Expects the length of `userServices` to be 2.
     - Checks if the titles and seller IDs of the retrieved services match the expected values.

2. **Users can change their password and pass validation**
   - Description: Tests that users can change their passwords and successfully validate the new password.
   - Assertions:
     - Creates a user `nonStudent`.
     - Changes the password of `nonStudent` using a PUT request to `/api/users/:id/update-user`.
     - Expects the response status to be 200 and the message to be 'User updated successfully'.
     - Attempts to log in with the updated password and expects a 200 status and receives a token.
     - Uses the token to make an authenticated request to `/api/users/:token/auth` and expects a 200 status.

### Feature 3: Search  

#### Unit Tests:

1. **Create a user:**
   - Description: Tests the creation of a user through the `/api/users` endpoint.
   - Assertions: Checks the response status, the existence of specific properties in the response body, and assigns the `user_id` for later use.

2. **Add Category:**
   - Description: Tests the addition of a category through the `/api/categories` endpoint.
   - Assertions: Checks the response status and the message in the response body.

3. **Add Duplicate Category:**
   - Description: Tests the addition of a duplicate category to trigger a conflict.
   - Assertions: Checks the response status for a conflict (status 500).

4. **Get Categories:**
   - Description: Tests retrieving categories through the `/api/categories` endpoint.
   - Assertions: Checks the response status, the data type, and the length of the array.

5. **Create Service for Category:**
   - Description: Tests the creation of a service through the `/api/services` endpoint.
   - Assertions: Checks the response status and the existence of specific properties in the response body.

6. **Add Service to Category:**
   - Description: Tests adding a service to a category through the `/api/categories/:category/add-service/:serviceId` endpoint.
   - Assertions: Checks the response status and the message in the response body.

7. **Add Service to non-existent Category:**
   - Description: Tests adding a service to a non-existent category to trigger a 404 error.
   - Assertions: Checks the response status and the message in the response body.

8. **Get services for Category:**
   - Description: Tests retrieving services for a category through the `/api/categories/:category` endpoint.
   - Assertions: Checks the response status, the data type, and the length of the array.

9. **Get all categories and services:**
   - Description: Tests retrieving all categories and services through the `/api/categories/services` endpoint.
   - Assertions: Checks the response status, the data type, and the length of the array.

10. **Get services for non-existent Category:**
    - Description: Tests retrieving services for a non-existent category to trigger a 404 error.
    - Assertions: Checks the response status and the message in the response body.

11. **Remove Service from category:**
    - Description: Tests removing a service from a category through the `/api/categories/:category/remove-service/:serviceId` endpoint.
    - Assertions: Checks the response status and the message in the response body.

12. **Remove non-existent Service from category:**
    - Description: Tests removing a non-existent service from a category to trigger a 404 error.
    - Assertions: Checks the response status and the message in the response body.

13. **Remove Service from non-existent Category:**
    - Description: Tests removing a service from a non-existent category to trigger a 404 error.
    - Assertions: Checks the response status and the message in the response body.

14. **Delete Created Category:**
    - Description: Tests deleting a created category through the `/api/categories` endpoint.
    - Assertions: Checks the response status and the message in the response body.

15. **Delete non-existent Category:**
    - Description: Tests deleting a non-existent category to trigger a 404 error.
    - Assertions: Checks the response status and the message in the response body.

16. **Delete created service:**
    - Description: Tests deleting a created service through the `/api/services/:serviceId` endpoint.
    - Assertions: Checks the response status and the data type of the response body.

17. **Delete user:**
    - Description: Tests deleting a user through the `/api/users/:userId` endpoint.
    - Assertions: Checks the response status, the message in the response body, and handles the case where the user is not found.

18. **Trying to add service to category when db is closed:**
    - Description: Tests trying to add a service to a category when the database is closed to trigger a 500 error.
    - Assertions: Checks the response status and the message in the response body.

19. **Trying to get category when db is closed:**
    - Description: Tests trying to get a category when the database is closed to trigger a 500 error.
    - Assertions: Checks the response status and the message in the response body.

20. **Trying to get service when db is closed:**
    - Description: Tests trying to get a service when the database is closed to trigger a 500 error.
    - Assertions: Checks the response status and the message in the response body.

21. **Trying to remove service from category when db is closed:**
    - Description: Tests trying to remove a service from a category when the database is closed to trigger a 500 error.
    - Assertions: Checks the response status.

22. **Trying to get all categories and services when db is closed:**
    - Description: Tests trying to get all categories and services when the database is closed to trigger a 500 error.
    - Assertions: Checks the response status and the message in the response body.

23. **Trying to delete created category when db is closed:**
    - Description: Tests trying to delete a created category when the database is closed to trigger a 500 error.
    - Assertions: Checks the response status.

### Integration Test: 

1. **User can find services by multiple categories**
   - Description: Tests the ability of a user to find services based on multiple categories.
   - Assertions:
     - Retrieves services with a category that doesn't exist and expects the result length to be 0.
     - Retrieves services with categories "Music" and "Business" and expects the result length to be 3.
     - Retrieves all services and verifies that the correct services are included in the result based on the categories searched.

2. **User can find services by a combination of keywords and categories**
   - Description: Tests the ability of a user to find services based on a combination of keywords and categories.
   - Assertions:
     - Retrieves services with keywords "test" and "Business" and expects the result length to be 3.
     - Retrieves all services and verifies that the correct services are included in the result based on the keywords and categories searched.

3. **User can find services by multiple keywords**
   - Description: Tests the ability of a user to find services based on multiple keywords.
   - Assertions:
     - Retrieves services with a keyword "hippo" that doesn't exist and expects the result length to be 0.
     - Retrieves services with keywords "Pianist" and "build" and expects the result length to be 3.
     - Retrieves all services and verifies that the correct services are included in the result based on the keywords searched.

### Feature 4: Chat

#### Unit Tests:

Here are the tests, descriptions, and assertions for each:

1. **Create a seller**
   - Description: Creates a new seller user.
   - Assertions:
     - Status code should be 201 (Created).
     - Response body should have property 'firstName' equal to 'seller'.

2. **Create a buyer**
   - Description: Creates a new buyer user.
   - Assertions:
     - Status code should be 201 (Created).
     - Response body should have property 'firstName' equal to 'buyer'.

3. **Create Service**
   - Description: Creates a new service.
   - Assertions:
     - Status code should be 201 (Created).
     - Response body should have properties 'title', 'description', 'price', and 'seller'.

4. **Create a chat**
   - Description: Creates a new chat.
   - Assertions:
     - Status code should be 201 (Created).
     - Response body should have properties 'seller', 'buyer', and 'service'.

5. **Get chat by id**
   - Description: Retrieves a chat by its id.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should have properties 'seller', 'buyer', and 'service'.

6. **Get chats by seller id**
   - Description: Retrieves chats by seller id.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should be an array.

7. **Get chats by buyer id**
   - Description: Retrieves chats by buyer id.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should be an array.

8. **Add message to chat**
   - Description: Adds a new message to a chat.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should have property 'message' equal to 'Message added to chat'.

9. **Get a message by id**
   - Description: Retrieves a message by its id.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should have properties 'sender' and 'body'.

10. **Get a message with invalid id**
    - Description: Attempts to retrieve a message with an invalid id.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Invalid message ID'.

11. **Add message to chat with invalid chat id**
    - Description: Attempts to add a message to a chat with an invalid chat id.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Invalid chat ID'.

12. **Add message to chat with invalid sender id**
    - Description: Attempts to add a message to a chat with an invalid sender id.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Invalid sender ID'.

13. **Add message to chat with no body**
    - Description: Attempts to add a message to a chat with no body.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Message body is required'.

14. **Get chat by id after adding message**
    - Description: Retrieves a chat by its id after adding a message.
    - Assertions:
      - Status code should be 200 (OK).
      - Response body should have properties 'seller', 'buyer', 'service', and 'messages'.

15. **Get chat with invalid id**
    - Description: Attempts to retrieve a chat with an invalid id.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Invalid chat ID'.

16. **Get chats by seller id with invalid id**
    - Description: Attempts to retrieve chats by seller id with an invalid id.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Invalid seller ID'.

17. **Get chats by buyer id with invalid id**
    - Description: Attempts to retrieve chats by buyer id with an invalid id.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Invalid buyer ID'.

18. **Delete created chat**
    - Description: Deletes a created chat.
    - Assertions:
      - Status code should be 200 (OK).
      - Response body should be an object.

19. **Delete chat after already deleting chat**
    - Description: Attempts to delete a chat that has already been deleted.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Chat not found'.

20. **Get chat by seller id after deleting chat**
    - Description: Attempts to retrieve chats by seller id after deleting a chat.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Chats not found'.

21. **Get chat by buyer id after deleting chat**
    - Description: Attempts to retrieve chats by buyer id after deleting a chat.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Chats not found'.

22. **Get message by id after deleting chat**
    - Description: Attempts to retrieve a message by its id after deleting a chat.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Message not found'.

23. **Delete chat with invalid id**
    - Description: Attempts to delete a chat with an invalid id.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Invalid chat ID'.

24. **Delete created service**
    - Description: Deletes a created service.
    - Assertions:
      - Status code should be 200 (OK).
      - Response body should be an object.

25. **Add message to chat after deleting chat**
    - Description: Attempts to add a message to a chat after deleting the chat.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Chat not found'.

26. **Delete created buyer**
    - Description: Deletes a created buyer user.
    - Assertions:
      - Status code should be 200 (OK).
      - Response body should be an object.

27. **Delete created seller**
    - Description: Deletes a created seller user.
    - Assertions:
      - Status code should be 200 (OK).
      - Response body should be an object.

28. **Add message to chat after deleting chat and user**
    - Description: Attempts to add a message to a chat after deleting the chat and user.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'User not found'.

29. **Get chat by id after deleting**
    - Description: Attempts to retrieve a chat by its id after

 deleting the chat.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Chat not found'.

30. **Get chats by seller id after deleting user and chats**
    - Description: Attempts to retrieve chats by seller id after deleting the user and chats.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'User not found'.

31. **Get chats by buyer id after deleting user and chat**
    - Description: Attempts to retrieve chats by buyer id after deleting the user and chat.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'User not found'.

32. **Create chat after db is closed - should throw and catch 500 error**
    - Description: Attempts to create a chat after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

33. **Get chat by id after db is closed - should throw and catch 500 error**
    - Description: Attempts to retrieve a chat by its id after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

34. **Get chats by seller id after db is closed - should throw and catch 500 error**
    - Description: Attempts to retrieve chats by seller id after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

35. **Get chats by buyer id after db is closed - should throw and catch 500 error**
    - Description: Attempts to retrieve chats by buyer id after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

36. **Add message to chat after db is closed - should throw and catch 500 error**
    - Description: Attempts to add a message to a chat after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

37. **Delete chat after db is closed - should throw and catch 500 error**
    - Description: Attempts to delete a chat after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

38. **Get messages by chat id after db is closed - should throw and catch 500 error**
    - Description: Attempts to retrieve messages by chat id after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

39. **Get message by id after db is closed - should throw and catch 500 error**
    - Description: Attempts to retrieve a message by its id after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

#### Integration Tests:

1. **User should be able to join multiple chats**
   - Description: Tests the ability of a user to join multiple chats and verifies the correctness of chatroom associations.
   - Assertions:
     - Expects the HTTP response status for creating chatroom1 to be 201 (Created).
     - Expects the HTTP response status for creating chatroom2 to be 201 (Created).
     - Verifies the number of chats for each user (seller and buyers).
     - Verifies the correctness of the buyer association for the created chatrooms.

2. **User can send, receive and view the entire message history of a chat**
   - Description: Tests user's ability to send, receive, and view the entire message history of a chat.
   - Assertions:
     - Creates messages and ensures that they are successfully created.
     - Retrieves all messages for chatroom1 and chatroom2 and verifies the expected number of messages.
     - Confirms that the sender information is correct for each message.

3. **User can delete a chat removing it from both users list of chats**
   - Description: Tests the ability of a user to delete a chat and ensures it is removed from both users' lists of chats.
   - Assertions:
     - Deletes chatroom2 and verifies the success of the deletion.
     - Ensures that the deleted chatroom cannot be retrieved.
     - Verifies that chatroom1 is still accessible and contains the expected user associations.
     - Confirms that messages associated with the deleted chatroom cannot be retrieved.
     - Verifies the correct behavior for accessing the list of chats for sellers and buyers after the deletion.

### Feature 6: Review 

#### Unit Tests:

Here are the tests, descriptions, and assertions for the provided code:

1. **Create a user**
   - Description: Creates a new user.
   - Assertions:
     - Status code should be 201 (Created).
     - Response body should have properties 'firstName', 'lastName', 'email', 'password', and 'isStudent'.

2. **Add service for created user and review**
   - Description: Adds a new service for the created user.
   - Assertions:
     - Status code should be 201 (Created).
     - Response body should have properties 'seller', 'description', 'title', 'price', and 'categories'.

3. **Create a review with the created user**
   - Description: Creates a new review for the created user and service.
   - Assertions:
     - Status code should be 201 (Created).
     - Response body should have properties 'reviewer', 'service', 'rating', 'text', and 'updated'.

4. **Get review by ID**
   - Description: Retrieves a review by its id.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should have properties 'reviewer', 'service', 'rating', 'text', and 'updated'.

5. **Get reviews by service ID**
   - Description: Retrieves reviews by service ID.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should be an array with properties 'reviewer', 'service', 'rating', 'text', and 'updated'.

6. **Get reviews by service ID with invalid id**
   - Description: Attempts to retrieve reviews by service ID with an invalid id.
   - Assertions:
     - Status code should be 400 (Bad Request).
     - Response body should have property 'message' equal to 'Invalid service ID'.

7. **Get reviews by user ID with invalid id**
   - Description: Attempts to retrieve reviews by user ID with an invalid id.
   - Assertions:
     - Status code should be 400 (Bad Request).
     - Response body should have property 'message' equal to 'Invalid user ID'.

8. **Edit review**
   - Description: Edits an existing review.
   - Assertions:
     - Status code should be 200 (OK).
     - Response body should have property 'message' equal to 'Review updated successfully'.

9. **Edit review with invalid id**
   - Description: Attempts to edit a review with an invalid id.
   - Assertions:
     - Status code should be 400 (Bad Request).
     - Response body should have property 'message' equal to 'Invalid review ID'.

10. **Delete review with invalid id**
    - Description: Attempts to delete a review with an invalid id.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Invalid review ID'.

11. **Delete review**
    - Description: Deletes an existing review.
    - Assertions:
      - Status code should be either 200 (OK) or 404 (Not Found) depending on whether the review is found or not.
      - If the review is found (200), response body should have property 'message' equal to 'Review deleted successfully'.
      - If the review is not found (404), response body should have property 'message' equal to 'Review not found'.

12. **Get a deleted review by service ID**
    - Description: Attempts to retrieve a deleted review by service ID.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Reviews not found'.

13. **Get a deleted review by user ID**
    - Description: Attempts to retrieve a deleted review by user ID.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Reviewer not found'.

14. **Delete service**
    - Description: Deletes the created service.
    - Assertions:
      - Status code should be 200 (OK).
      - Response body should have property 'message' equal to 'Service deleted successfully'.

15. **Delete user**
    - Description: Deletes the created user.
    - Assertions:
      - Status code should be either 200 (OK) or 404 (Not Found) depending on whether the user is found or not.
      - If the user is found (200), response body should have property 'message' equal to 'User deleted successfully'.
      - If the user is not found (404), it's still a successful deletion.

16. **Get a deleted review by ID**
    - Description: Attempts to retrieve a deleted review by its ID.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Review not found'.

17. **Edit a deleted review**
    - Description: Attempts to edit a deleted review.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Review not found'.

18. **Delete a deleted review**
    - Description: Attempts to delete a deleted review.
    - Assertions:
      - Status code should be 404 (Not Found).
      - Response body should have property 'message' equal to 'Review not found'.

19. **Get a deleted review with invalid id**
    - Description: Attempts to retrieve a deleted review with an invalid id.
    - Assertions:
      - Status code should be 400 (Bad Request).
      - Response body should have property 'message' equal to 'Invalid review ID'.

20. **Try to create a review after closing the database**
    - Description: Attempts to create a review after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

21. **Try to get a review after closing the database**
    - Description: Attempts to retrieve a review after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

22. **Try to edit a review after closing the database**
    - Description: Attempts to edit a review after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

23. **Try to get reviews by service ID after closing the database**
    - Description: Attempts to retrieve reviews by service ID after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

24. **Try to delete a review after closing the database**
    - Description: Attempts to delete a review after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message' equal to 'Internal server error'.

25. **Try to get reviews by user ID after closing the database**
    - Description: Attempts to retrieve reviews by user ID after closing the database.
    - Assertions:
      - Status code should be 500 (Internal Server Error).
      - Response body should have property 'message

#### Intregration Tests:

1. **User can create multiple reviews on the same service**
   - Description: Tests the ability of a user to create multiple reviews on the same service and verifies the correctness of the reviews.
   - Assertions:
     - Expects the HTTP response status for creating the first review to be 201 (Created).
     - Expects the HTTP response status for creating the duplicate review to be 201 (Created).
     - Retrieves reviews for the service and verifies reviewer, service, rating, and text for each review.

2. **User can create reviews of different services**
   - Description: Tests the ability of a user to create reviews of different services and ensures that the reviews are associated with the correct services.
   - Assertions:
     - Creates a new service.
     - Creates a review for the first service.
     - Creates a review for the second service.
     - Retrieves reviews for both services and confirms the correct associations.

3. **User can find all the reviews they have created**
   - Description: Tests the ability of a user to find all the reviews they have created.
   - Assertions:
     - Creates a second user.
     - Creates reviews for multiple services.
     - Retrieves reviews for each user and verifies the number of reviews and the correctness of associations (reviewer, service, text, rating).

#### LogIn Acceptance Testing:

1. **Login page should render**
   - Description: Tests whether the login page renders without errors.
   - Assertions:
     - Renders the `Login` component within a `MemoryRouter`.

2. **Input fields should exist**
   - Description: Ensures that the email and password input fields exist on the login page.
   - Assertions:
     - Renders the `Login` component within a `MemoryRouter`.
     - Retrieves the email and password input fields by their placeholders.
     - Asserts that both input fields are in the document.

3. **Input fields should change**
   - Description: Tests whether the input fields change as expected.
   - Assertions:
     - Renders the `Login` component within a `MemoryRouter`.
     - Retrieves the email and password input fields by their placeholders.
     - Fires change events on the email and password fields with specific values.
     - Asserts that the input fields have the expected values.

4. **Valid login should return a token**
   - Description: Tests the login process with valid credentials and expects a token.
   - Assertions:
     - Renders the `Login` component within a `MemoryRouter`.
     - Defines a mock response for the login request.
     - Defines the expected request body with email and password.
     - Retrieves email, password, and the login button.
     - Fires change events on the email and password fields.
     - Fires a click event on the login button.
     - Expects that `axios.post` was called with the correct URL and body.

5. **Incorrect email should fail**
   - Description: Tests the login process with incorrect email and expects a failure.
   - Assertions:
     - Renders the `Login` component within a `MemoryRouter`.
     - Defines a mock rejection for the login request with an error response.
     - Retrieves email, password, and the login button.
     - Fires change events on the email and password fields.
     - Fires a click event on the login button.
     - Expects that `axios.post` was called with the correct URL and body.
     - Waits for the error message 'User not found' to be in the document.

6. **Server error should display**
   - Description: Tests the login process with a server error and expects an error message.
   - Assertions:
     - Renders the `Login` component within a `MemoryRouter`.
     - Defines a mock rejection for the login request with a server error.
     - Retrieves email, password, and the login button.
     - Fires change events on the email and password fields.
     - Fires a click event on the login button.
     - Expects that `axios.post` was called with the correct URL and body.
     - Waits for the error message 'Server error' to be in the document.

#### SignUp Acceptance Testing:

1. **Signup page should render**
   - Description: Tests whether the signup page renders without errors.
   - Assertions:
     - Renders the `Signup` component within a `MemoryRouter`.

2. **Input fields should exist**
   - Description: Ensures that the first name, last name, email, password, and confirm password input fields exist on the signup page.
   - Assertions:
     - Renders the `Signup` component within a `MemoryRouter`.
     - Retrieves input fields by their placeholders.
     - Asserts that all input fields are in the document.

3. **Create new account**
   - Description: Tests the account creation process and expects a resolved promise with user data.
   - Assertions:
     - Renders the `Signup` component within a `MemoryRouter`.
     - Defines a mock response for the signup request.
     - Defines the expected request body with user details.
     - Retrieves input fields and the client checkbox.
     - Fires change events on the input fields with specific values.
     - Fires a click event on the client checkbox.
     - Uses `act` to handle the asynchronous `signUp` function.
     - Expects that `axios.post` was called with the correct URL and body.

#### Review Acceptance Testing:

1. **Renders ReviewPopUp component**
   - Description: Tests whether the `ReviewPopUp` component renders without errors.
   - Assertions:
     - Renders the `ReviewPopUp` component with the specified props within a `MemoryRouter`.

2. **Displays average rating**
   - Description: Ensures that the average rating is correctly displayed.
   - Assertions:
     - Renders the `ReviewPopUp` component with the specified props within a `MemoryRouter`.
     - Retrieves the average rating element by text content and asserts its presence.

3. **Displays reviews with user names and ratings**
   - Description: Verifies that reviews are displayed with user names and ratings using star symbols.
   - Assertions:
     - Renders the `ReviewPopUp` component with the specified props within a `MemoryRouter`.
     - Retrieves all elements containing the '★' symbol and asserts their count.

4. **Displays a review form**
   - Description: Tests whether the review form is correctly displayed.
   - Assertions:
     - Renders the `ReviewPopUp` component with the specified props within a `MemoryRouter`.
     - Retrieves all elements containing the '★' symbol and asserts their count.
     - Retrieves the submit button by role and asserts its presence.

#### Regression Testing:

All tests will be run on each pull request, if any of the tests outlined fail the pull request will be declined. 

## 2.2	Test Completeness

Testing will be complete when:  
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

# 4	Terms/Acronyms 

| TERM/ACRONYM | DEFINITION                    |
|--------------|-------------------------------|
| API          | Application Program Interface |
| AUT          | Application Under Test        |
| QA           | Quality Assurance             |
| UI           | User Interface                |

