// Tests for the Service API
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db = require('../Config/db')
const app = require('../app'); 
require("./ServiceIntegration.test")
const User = require('../Models/User')
const Service = require('../Models/Service')
const Chat = require('../Models/Chat')
const Message = require('../Models/Message')

describe('Chat Integration Tests', function() {
    let numUsers = 3
    let users = []
    let messageId = []
    let service = null
    let chatroom1 = null
    let chatroom2 = null

    before((done) => {
        db.connectDB()
        .then(async() => {
            for(var i = 0; i < numUsers; i++)
            {
                var user = await request(app).post('/api/users/').send({
                    firstName: "first",
                    lastName: "last",
                    email: "email"+i+"@gmail.com",
                    password: "password"+i,
                    isStudent: true
                })

                user = JSON.parse(user.text)
                users.push(user)
            }

            var newService = await request(app).post('/api/services/').send({
                seller: users[0]._id,
                description: 'Service that froms chatroom',
                title: 'Chatroom',
                price: 150
            })

            service = JSON.parse(newService.text)

            done(); // Signal that before hook is complete
        })
        .catch((error) => {
            done(error); // Signal that before hook failed with an error
        });
    });

    after(async () => {
        for(var i = 0; i < users.length; i++)
        {
            await User.findOneAndDelete({_id: users[i]._id})
        }

        for(var i = 0; i < messageId.length; i++)
        {
            await Message.findOneAndDelete({_id: messageId[i]})
        }
  
        await Service.findOneAndDelete({_id: service._id})
        await Chat.findOneAndDelete({_id: chatroom1._id})
    });

    it('User should be able to join multiple chats.', async() =>{
        var newChatroom = await request(app).post('/api/chats/').send({
            seller: users[0]._id,
            buyer: users[1]._id,
            service: service._id
        })

        expect(newChatroom.status).to.equal(201)
        chatroom1 = JSON.parse(newChatroom.text)

        newChatroom = await request(app).post('/api/chats/').send({
            seller: users[0]._id,
            buyer: users[2]._id,
            service: service._id
        })

        expect(newChatroom.status).to.equal(201)
        chatroom2 = JSON.parse(newChatroom.text)

        var user1Chats = await request(app).get('/api/chats/seller/'+users[0]._id)
        user1Chats = JSON.parse(user1Chats.text)
        expect(user1Chats.length).to.equal(2)

        var user2Chats = await request(app).get('/api/chats/buyer/'+users[1]._id)
        user2Chats = JSON.parse(user2Chats.text)
        expect(user2Chats.length).to.equal(1)

        var user3Chats = await request(app).get('/api/chats/buyer/'+users[2]._id)
        user3Chats = JSON.parse(user3Chats.text)
        expect(user3Chats.length).to.equal(1)

        if(user1Chats[0].buyer === users[1]._id)
        {
            expect(user1Chats[0].buyer).to.equal(chatroom1.buyer)
            expect(user1Chats[1].buyer).to.equal(chatroom2.buyer)
        }
        else
        {
            expect(user1Chats[0].buyer).to.equal(chatroom2.buyer)
            expect(user1Chats[1].buyer).to.equal(chatroom1.buyer)
        }
    });
    
    it('User can send, receive and view the entire message history of a chat.', async() =>{
        var messages = [
            {sender: users[0]._id, chat: chatroom1._id, message: "hello world"}, 
            {sender: users[2]._id, chat: chatroom2._id, message:"Other chat"}, 
            {sender: users[1]._id, chat: chatroom1._id, message: "chat1"}, 
            {sender: users[0]._id, chat: chatroom2._id, message: "chat2"}, 
            {sender: users[1]._id, chat: chatroom1._id, message: "final message"}]

        for(var i = 0; i < messages.length; i++)
        {
            var newMsg = await request(app).put('/api/chats/'+messages[i].chat).send({
                sender: messages[i].sender,
                body: messages[i].message
            })
            expect(newMsg.status).to.equals(200)
            newMsg = JSON.parse(newMsg.text)
            messageId.push(newMsg._id)

            //This confirms that the most recent message has the correct message body.
            var currMsg = await request(app).get('/api/chats/message/' + newMsg._id)
            currMsg = JSON.parse(currMsg.text)
            expect(currMsg.body).to.equal(messages[i].message)
        }
        
        var allMessagesRoom1 = await request(app).get('/api/chats/messages/'+chatroom1._id)

        allMessagesRoom1 = JSON.parse(allMessagesRoom1.text)
        var messagesRoom1 = allMessagesRoom1.messages
        expect(messagesRoom1.length).to.equal(3)

        var allMessagesRoom2 = await request(app).get('/api/chats/messages/'+chatroom2._id)

        allMessagesRoom2 = JSON.parse(allMessagesRoom2.text)
        var messagesRoom2 = allMessagesRoom2.messages
        expect(messagesRoom2.length).to.equal(2)

        //confirm that the sender is correct and that all messages are retrieved.
        for(var i = 0; i < messages.length; i++)
        {
            var foundMessage = false
            for(var j = 0; j < messagesRoom1.length; j++)
            {
                if(messages[i].message === messagesRoom1[j].body)
                {
                    foundMessage = true
                    expect(messagesRoom1[j].sender).to.equal(messages[i].sender)
                }
            }
            for(var j = 0; j < messagesRoom2.length; j++)
            {
                if(messages[i].message === messagesRoom2[j].body)
                {
                    foundMessage = true
                    expect(messagesRoom2[j].sender).to.equal(messages[i].sender)
                }
            }

            //This confirms that the message body appears in at least one of the two chatrooms.
            expect(foundMessage).to.equal(true)
        }
    });

    it('User can delete a chat removing it from both users list of chats.', async() =>{
        var deletedChatroomId = chatroom2._id

        //delete chatroom2
        var successfulDelete = await request(app).delete('/api/chats/'+deletedChatroomId)
        expect(successfulDelete.status).to.equal(200)

        //get chatroom by id using the deleted id
        var retrieved = await request(app).get('/api/chats/'+deletedChatroomId)
        expect(retrieved.status).to.equal(404)

        //get chatroom by id using chatroom1
        retrieved = await request(app).get('/api/chats/'+chatroom1._id)
        expect(retrieved.status).to.equal(200)

        retrieved = JSON.parse(retrieved.text)
        expect(retrieved.buyer).to.equal(users[1]._id)
        expect(retrieved.seller).to.equal(users[0]._id)

        //get the deleted chatrooms messages
        retrieved = await request(app).get('/api/chats/messages/'+deletedChatroomId)
        expect(retrieved.status).to.equal(404)

        //get chatroom1's messages
        retrieved = await request(app).get('/api/chats/messages/'+chatroom1._id)
        expect(retrieved.status).to.equal(200)

        //get the sellers chatrooms
        retrieved = await request(app).get('/api/chats/seller/'+users[0]._id)
        expect(retrieved.status).to.equal(200)

        retrieved = JSON.parse(retrieved.text)
        expect(retrieved.length).to.equal(1)
        expect(retrieved[0]._id).to.equal(chatroom1._id)
        expect(retrieved[0].buyer).to.equal(chatroom1.buyer)

        //get buyer1's chatrooms which should still exist because they are in chatroom1
        retrieved = await request(app).get('/api/chats/buyer/'+users[1]._id)
        expect(retrieved.status).to.equal(200)

        retrieved = JSON.parse(retrieved.text)
        expect(retrieved.length).to.equal(1)
        expect(retrieved[0]._id).to.equal(chatroom1._id)
        expect(retrieved[0].seller).to.equal(chatroom1.seller)

        //get buyer2's chatroom which has been deleted
        retrieved = await request(app).get('/api/chats/buyer/'+users[2]._id)
        expect(retrieved.status).to.equal(404)
    });
})