# TEST PLAN FOR WORKSY

ChangeLog 

| Version | Change Date  | By   | Description          |
|---------|--------------|------|----------------------|
| 1.0.0   | Oct, 19 2023 | Evan | Initial Testing Plan |
| 2.0.0   | Nov, 16 2023 |Diljot|Acceptance, Regression|
|         |              |      |                      |
|         |              |      |                      |

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

1. **Test Get Services by Categories**: Create Services and associate them with Categories. Then confirm that a user can find all services for a specific category.

2. **Test Get Reviews by Service**: Create a Service, User and Reviews then confirm that you can get all reviews that correspond to a specific service.

#### Acceptance Tests:

1. **As a User, I want to be able to edit my service information**:
    - Log in as a user, navigate to the service management section, and edit the details of a created service
    - Confirm that the changes are reflected in the system, and the updated service information is displayed.

2. **As a User, I want to see a list of services in a specific category**:    
    - Log in as a user, navigate to the service listing page, and select a specific category.
    -     * Confirm that the displayed services belong only to the selected category.

3. **As a User, I want to delete a service I created**:  
    - Log in as a user, navigate to the service management section, and delete a service.
    - Confirm that the service is no longer present in the user's list of services and the overall service listing.

4. **As a User, I want to view detailed information about a service:**:    
    - Log in as a user, navigate to the service details page, and select a specific service.
    - Confirm that detailed information about the service is displayed, including description, availability, and associated user.

#### Regression Tests: 

1. **Test Service Creation**:
    - Verify that creating a service through the "/api/services" endpoint works as expected.
    - Ensure that the service is stored in the database, and the response indicates successful creation.
2. **Test Service Update**:
    - Create a service and update its details by sending a PUT request through API.
    - Confirm that the updated information is correctly reflected in the service's data.
3. **Test Service Delete**:
    - Create a service and then delete it by sending a DELETE request through API.
    - Ensure that the service is no longer retrievable from the database.
4. **Test Adding Service to User**:
    - Create a user and a service, then associate the service with the user by sending a PUT request.
    - Verify that the user's list of services is updated.


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

1. **User can Get Services by UserId:**
   - Test creating users and Services.
   - Confirm that the created users and services are stored correctly in the database.
   - Test getting services by UserId.
   - Confirm that the services returned are all services created by that user and that there are no services that were created by another user returned.

2. **Users can change password and Authentication will still function:**
   - Simulate a user updating their password.
   - Test that changes are correctly saved in the user document.
   - Verify that the updated data is accurately reflected when retrieving the user's profile.


#### Acceptance Tests:

1. **As a user, I want to be able to create an account so I can use the app**:
    - Navigate from home page to click "signup" button that leads me to the signup page
    - Fill out name, lastname, email, and both password fields
    - Select if you are a student or not.
    - Submit the document by clicking the "create account" button
    - Return to homepage 

2. **As a user, I want to log in to access my account**:
    - Navigate from the home page to click the "login" button leading to the login page.
    - Enter valid login credentials (email and password) and submit the form.
    - Expect a redirection to the home page, indicating a successful login. 
3. **As a user, I want to update my profile information**:
    - Log in using valid credentials and navigate to the profile settings page.
    - Update profile information, such as name, email, or profile picture.
    - Confirm that the changes are saved by checking the updated data on the user profile page.
4. **As a user, I want to view my servicers**:
    - Log in with valid credentials and navigate to the services section.
    - Confirm that the displayed services belong to the logged-in user.
    - Ensure that only the user's services are visible.
5. **As a user, I want to delete my account**:
    - Log in with valid credentials and navigate to the account settings page.
    - Click on the option to delete the account and follow the confirmation process.
    - Expect a successful deletion and a redirect to the home page.

#### Regression Tests:
1. **Test User Creation**:
    - Verify that creating a user through the "/api/users" endpoint works as expected.
    - Ensure that the user is stored in the database, and the response indicates successful creation.

2. **Test User Update**:
    - Create a user and update their details by sending a PUT request to "/api/users/:id."
    - Confirm that the updated information is correctly reflected in the user's data.

3. **Test User Deletion**:
    - Create a user and then delete it by sending a DELETE request to "/api/users/:id."
    - Ensure that the user is no longer retrievable from the database.

4. **Test Adding Service to User**:
    - Create a user and a service, then associate the service with the user by sending a PUT request.
    - Verify that the user's list of services is updated.

5. **Test Invalid User Update**:
    - Attempt to update a user with an invalid user ID.
    - Confirm that the API responds with an error message, and the user remains unchanged.
    
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

### Integration Test: 

1. **Test Search by Multiple Categories**:
    - Create users and services.
    - Setup the association between services and categories.
    - Send a query for multiple categories.
    - Confirm that the returned services consist of all services that contain that Category.

2. **Test Search by a Combination of Keywords and Categories**:
    - Create users and services.
    - Setup the association between services and categories.
    - Send a query for both keywords and categories simultaneously.
    - Confirm that the returned services consist of all services that contain at least one of the provided categories or keywords.

3. **Test Search by Multiple Keywords**:
    - Create users and services.
    - Setup the association between services and categories.
    - Send a query containing multiple keywords.
    - Confirm that the returned services consist of all services that contain at least one of the provided keywords.


#### Acceptance Tests:

1. **As a user, I want to be able to search for Services**:
    - Navigate from the home page to the search bar.
    - Enter specific keywords related to the desired services.
    - Initiate the search and ensure the results page displays relevant services.
    - Click on a service to view detailed information.
    - Verify that the service details match the expected data.
2. **As a user, I want to explore categories**:  
    - Access the category section from the navigation menu.
    - Select a category of interest. A
    - Confirm that the category page displays relevant services associated with the chosen category.
    - Click on a service to view detailed information.
    - Verify that the service details match the expected data.
3. **Test Service Filtering in Category**:
    - Access a specific category from the category section.
    - Verify that the displayed services are only those associated with the selected category.
    - Click on a service to view detailed information.
    - Verify that the service details match the expected data.
4. **Test Service Search with No Results**:
    - Navigate to the search bar and enter keywords with no matching services.
    - Confirm that the search results page indicates no matching services found.
5. **Test Category Navigation from Service**:
    - Access a service details page.
    - Click on the associated category to navigate to the category page.
    - Verify that the displayed services are only those associated with the selected category.

#### Regression Tests:
1. **Search with Empty Query**:
    - Attempt to perform a search with an empty query.
    - Expect a response with a status of 400 (Bad Request) and an appropriate error message.
2. **Search with Special Characters**:
    - Attempt to perform a search with special characters in the query.
    - Verify that the search results are not affected by special characters and return accurate results.
3. **Attempt to Access Deleted Service**:
    -Try to access a service that was previously deleted.
    -Expect a response with a status of 404 (Not Found) and an appropriate error message.    

### Feature 4: Chat

#### Unit Tests:

1. **Test User Authentication**:
   - Test that only authenticated users can access the chat feature.
   - Mock the authentication process and verify that unauthenticated users are denied access.

2. **Test Message Sending**:
   - Test the function responsible for sending messages.
   - Provide mock data for the sender, receiver, and message content.
   - Verify that the function sends the message and updates the chat history appropriately.

3. **Test Message Receiving**:
   - Test the function responsible for receiving messages.
   - Provide mock data for incoming messages.
   - Verify that the function processes and displays incoming messages correctly.

4. **Test Message Validation**:
   - Test the message validation function.
   - Provide various types of messages, including valid and invalid ones.
   - Ensure that the function correctly identifies valid and invalid messages.

5. **Test Message Formatting**:
   - Test the function that formats messages for display.
   - Provide messages with different formatting requirements (e.g., emojis, links, special characters).
   - Verify that the function formats messages as expected.

6. **Test Message Storage**:
   - Test the storage mechanism for chat messages.
   - Use mock data for messages and users.
   - Verify that messages are correctly stored, indexed, and retrieved.

7. **Test User Online/Offline Status**:
   - Test the function for tracking user online/offline status.
   - Simulate user login and logout.
   - Verify that the function updates and reports user status accurately.

8. **Test Message Deletion**:
    - Test the function for deleting messages.
    - Mock the deletion process and verify that messages are removed from the chat history.

9. **Test Error Handling**:
    - Test how the chat feature handles errors, such as network issues or server errors.
    - Simulate error conditions and verify that the feature responds appropriately.

#### Integration Tests:

1. **User can Join Multiple Chats**:
    - Create users, services and chats.
    - confirm that the same user can create multiple chats without any issues.
2. **Confirm that Users can Send Messages, Receive Messages and View Their Message History**:
    - Create users, services and chats.
    - Send messages and confirm their reciept by the other user. 
    - Confirm you can get all messages sent within a chat.
    - Verify that the messages are stored correctly in the chat history.
3. **Confirm that Users can Delete Chats**:
    - Create a service, users and chats.
    - Confirm that both buyers and sellers can delete a chat.
    - Confirm that upon deletion users can no longer use the chatroom.


#### Acceptance Tests:

1. **User Engages in One-on-One Chat**:
    - As a user, initiate a chat with another user.
    - Send and receive messages.
    - Verify that the chat history is correctly updated in real-time.
2. **User Engages in Group Chat**:
    - As a user, join a group chat with multiple participants.
    - Exchange messages in the group.
    - Verify that all messages are correctly displayed for all participants.
3. **User Receives Real-Time Notifications**:
    - As a user, have another user send you a message.
    - Verify that you receive a real-time notification about the new message.

#### Regression Tests:

1. **Message Storage Integrity**:
    - Send a series of messages and verify that they are correctly stored in the chat history.
    - Retrieve the chat history and ensure that all messages are intact.
2. **Error Handling and Recovery**:
    - Introduce simulated errors (e.g., network issues) during a chat session.
    - Verify that the chat feature handles errors gracefully and recovers without data loss.
3. **User Authentication Persistence**:
    - Simulate user logouts and logins.
    - Verify that the chat feature maintains user authentication and continues to track user online/offline status correctly.


### Feature 6: Review 

#### Unit Tests:

1. **Test Review Creation:**
   - Test that a user can create a review for a product or service.
   - Ensure the review includes a title, text, a rating, and a reference to the item being reviewed.
   - Verify that the review is associated with the user who created it.

2. **Test Review Rating Validation:**
   - Test that the review rating is within a valid range (e.g., between 1 and 5 for a 5-star rating system).
   - Ensure that an error is thrown or an appropriate response is returned if the rating is out of bounds.

3. **Test Review Title and Text Length:**
   - Test that the review title and text have a minimum and maximum character length.
   - Verify that the system enforces these length constraints and provides meaningful error messages for violations.

4. **Test Review Deletion:**
   - Test that a user can delete their own review.
   - Ensure that users cannot delete reviews created by others.
   - Verify that the review is removed from the system upon deletion.

5. **Test Review Editing:**
   - Test that a user can edit their own review.
   - Ensure that users cannot edit reviews created by others.
   - Verify that the updated review data is saved correctly.

6. **Test Review Retrieval:**
   - Test that reviews can be retrieved for a specific product or service.
   - Ensure that the reviews are sorted by date or rating as required.
   - Verify that the response includes the review title, text, rating, and user information.

7. **Test Review Validation:**
   - Test the validation logic for creating or updating reviews.
   - Verify that the system prevents duplicate reviews by the same user for the same item.
   - Test that the system prevents users from reviewing their own products or services.

8. **Test Review Ownership:**
   - Test that a user can check if they own a review.
   - Verify that the system correctly identifies the owner of a review.

9. **Test User Review History:**
    - Test that users can retrieve their own review history, including products or services they have reviewed.
    - Ensure that the retrieved list of reviews is accurate.

#### Intregration Tests:
1. **Confirm Users can Leave Multiple Reviews of Single Service**:
    - Create a user, a product or service, and multiple reviews for that item.
    - Send requests to create and retrieve the reviews.
    - Verify that the created reviews are accurately retrieved and associated with the correct user and item.
2. **Confirm Users can Leave Reviews on Multiple Services**:
    - Create a user, a product or service, and a review for that item.
    - Send requests to create and retrieve reviews for multiple services.
    - Verify that the reviews are accurately retrieved and associated with the correct users and items.
3. **Confirm User can Retrieve all of Their Reviews**:
    - Create a user, a product or service, and reviews for that item.
    - Send requests to retrieve all reviews created by the user.
    - Verify that the returned reviews contain the correct amount of reviews with the correct information and user id. 

#### Acceptance Tests:

1. **User Reviews Product**:
    - As a user, navigate to a product or service page.
    - Create a review with a title, text, and a rating.
    - Verify that the review is displayed on the product or service page.
2. **User Edits Review**:
    - As a user, navigate to a product or service page where you have a review.
    - Edit the review by changing the title, text, or rating.
    - Verify that the updated review is correctly displayed on the product or service page.
3. **User Deletes Review**:
    - As a user, navigate to a product or service page where you have a review.
    - Delete the review.
    - Verify that the review is no longer displayed on the product or service page.
4. **User Views Review History**:
    - As a user, navigate to your profile or account settings.
    - Access the review history section.
    - Verify that the displayed review history matches the reviews you have created.
5. **User Tries to Review Own Product**:
    - As a user, navigate to a product or service page that you own.
    - Attempt to create a review for your own product or service.
    - Verify that the system prevents you from reviewing your own item.

#### Regression tests:
1. **Review Deletion with Invalid Ownership**:
    - Attempt to delete a review owned by another user.
    - Verify that the system returns an appropriate error message or status code.
2. **Review Retrieval Sorting**:
    - Create multiple reviews for a product or service with varying ratings and dates.
    - Retrieve the reviews for the item and verify that they are correctly sorted by date or rating.
3. **Review Validation with Empty Title or Text**:
    - Attempt to create a review with an empty title or text.
    - Verify that the system returns an appropriate error message.
4. **Review Validation for Non-Existent Item**:
    - Attempt to create a review for a product or service that does not exist.
    - Verify that the system returns an appropriate error message or status code.



## 2.2	Test Completeness

Testing will be complete once we have reached:  
- 75% test coverage
- All automated and manual test cases are executed successfully
- 85% test coverage for the backend 




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

