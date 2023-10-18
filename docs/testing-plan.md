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

#### Integration Tests:

#### Acceptance Tests:

### Feature 2: Account 

#### Unit Tests:

#### Integration Tests:

#### Acceptance Tests:

### Feature 3: Search  

#### Unit Tests:

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

