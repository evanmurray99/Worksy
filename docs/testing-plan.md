## 1.	Introduction

### 1.1	 Scope

#### Feature 1: Search  
Search will allow users to find the products or services that they are looking for. 
Users will be able to filter their searches by applying price ranges, locations, categories, conditions, and more. 
Users will also be able to sort search results based on relevance, price, ratings, and age of listings.

#### Feature 2: Post
Post will allow users to create detailed listings for the products and services they wish to buy or sell. 
Users will be able to include information such as titles, descriptions, prices, and images within their posts.
Each post will serve as a communication hub between the buyers and sellers.

#### Feature 3: Account 
 Account will allow users to update or delete postings that they created. 
 Additionally, users will be able to see posts that they have bookmarked as well as chats that they are a part of. 
 This feature will give users the ability to control what information they reveal to other users and allow them to maintain and control their privacy on the application. 
 The account will contain minimal personal information such as First name, Last name, email, username, and password in addition to their posts, chat history, and reviews that they have posted.

#### Feature 4: Chat
Chat will be able to support one-on-one messaging. Chats will be accessed within a post so users can create a chat with the posts creator in one click to start a conversation. Then once the chat is created you will be able to send and receive messages to and from the post creator. 
There will also be one central location where you can view all of your ongoing chats so that they are easy to find. Messages are only sent to the accounts that are linked to the chatroom and not to any other accounts.

#### Feature 5: Load balancing 
load balancing to help meet the non-functional requirement of being able to respond to 100 users placing 1,000 requests per minute.
This feature is critical for our application to function in a real-world setting as it would need to be able to handle hundreds of users and thousands of requests in order for it to be practical.


#### Feature 6: Review 
The review feature gives the users a chance to rate the finished product that they receive. 
The Review feature will contain both a rating and a comment component. The rating will be based on a five-star system in which 5 stars is the best possible rating with 1 star being the worst. 
The comment feature will be free-form with a character restriction of 255 characters. In a post at a quick glance of the review feature, you will be able to see the average rating along with a breakdown of how many ratings of 1, 2, 3, 4, and 5 stars. 
In addition, you will see the comments and ratings of all reviews connected to the corresponding post from newest to oldest.

### 1.2	Roles and Responsibilities 

| **Name** | **Net ID** | **GitHub Username** | **Role** |
|----------|------------|---------------------|----------|
| Casandra | haywardc   | chayward3113        |          |
| Diljot   | singhd18   | Dilpunjab           |          |
| Evan     | murraye2   | evanmurray99        |          |
| Noel     | omeizan    | omeizan             |          |
| Tung     | nguye49    | xuaantung           |          |  

## 2	Test Methodology
### 2.1	Test Levels

Test Levels define the Types of Testing to be executed on the Application Under Test (AUT).  In this course, unit testing, integraiton tesing, acceptance testing, regression testing, and laod testing are mandatory. Please describe how will you do these testings. You may skip load testing at this moment. Please revisit it after the related lecture is given. 

Requirements:
-	List the class/method/core feature you plan to test and how you could like test them and its acceptance criteria. 
-	For unit testing, at least 10 unit tests for EACH core feature to cover the code related to each core feature
-	For integration testing, at leat 10 in total to cover core features.
-	Acceptance testing for each core feature. Let’s use end-user test for this. You can ask real end-user or your team members to go through each user story and see if the requrements are meet. 
-	For regression testing, need to execute all above unit tests + integration tests you have for each commit pushed to main branch. 
-	For load testing, when design the load, make sure at least twos request associated with every core feature is inlcuded in the test load. 




### 2.2	Test Completeness
Here you define the criterias that will deem your testing complete. For instance, a few criteria to check Test Completeness would be
•	100% back-end code coverage (mandatory for this project), all the back-end source code should be covered by test cases.




## 3	Resource & Environment Needs

### 3.1	Testing Tools

Make a list of Tools like
•	Requirements Tracking Tool
•	Bug Tracking Tool
•	Automation Tools
•	…

 
### 3.2	Test Environment
It mentions the minimum hardware requirements that will be used to test the Application.  

Example, following software’s are required in addition to client-specific software. 

•	Windows 8 and above
•	Travis-CI
•	Jenkins
•	Jmeter
•	…


## 4	Terms/Acronyms 
Make a mention of any terms or acronyms used in the project

TERM/ACRONYM	DEFINITION
API	Application Program Interface
AUT	Application Under Test

