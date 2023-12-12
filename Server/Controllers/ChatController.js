const Chat = require('../Models/Chat');
const User = require('../Models/User');
const Message = require('../Models/Message');
const mongoose = require("mongoose");

// Create a new chat 
// Required body in the request should contain the following fields: seller, buyer, service
const createChat = async (req, res) => {
    try {
        const {seller, buyer, service} = req.body;
        const messages = [];

        const newChat = new Chat(
            {
                seller,
                buyer,
                service,
                messages
            });

        // Save the chat to the database
        await newChat.save();

        res.status(201).json(newChat);
    } catch (err) {
        console.error('Error creating chat:', err);
        res.status(500).json({ message: 'Internal server error'});
        
    }
};

// GET /chats by Id
// Required parameter in the request is the chatId of the chat to be fetched
const getChat = async (req, res) => {
    try {
        const chatId = req.params.id;


        if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ message: 'Invalid chat ID' });
        }

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json(chat);
    } catch (err) {
        console.error('Error fetching chat by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /messages by chat id, returns all messages in a chat
// Required parameter in the request is the chatId of the chat to be fetched
const getMessages = async (req, res) => {
    try {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        const messageIds = chat.messages; // Assuming messages is an array of message IDs
        const messages = await Message.find({ _id: { $in: messageIds } });

        res.status(200).json({ messages });
    } catch (err) {
        console.error('Error fetching chat by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /chats by seller id, returns all chats where this user is a seller
// Required parameter in the request is the sellerId of the seller to be fetched
const getChatsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        if(!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
            return res.status(400).json({ message: 'Invalid seller ID' });
        }

        const seller = await User.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ message: 'User not found' });
        }

        const chats = await Chat.find({ seller: sellerId });

        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: 'Chats not found' });
        }

        res.status(200).json(chats);
    } catch (err) {
        console.error('Error fetching chats by seller ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /chats by buyer id
//returns all chats where this user is a buyer
const getChatsByBuyer = async (req, res) => {
    try {
        const buyerId = req.params.id;

        if(!buyerId || !mongoose.Types.ObjectId.isValid(buyerId)) {
            return res.status(400).json({ message: 'Invalid buyer ID' });
        }

        const buyer = await User.findById(buyerId);

        if (!buyer) {
            return res.status(404).json({ message: 'User not found' });
        }

        const chats = await Chat.find({ buyer: buyerId });

        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: 'Chats not found' });
        }

        res.status(200).json(chats);
    } catch (err) {
        console.error('Error fetching chats by buyer ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// add message to chat, chat id is required and sender id is required
//content and timestamp are required in the request body
const addMessage = async (req, res) => {
    try {
        const chatId = req.params.id;
        const {sender, body} = req.body;

        if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ message: 'Invalid chat ID' });
        }

        if (!sender || !mongoose.Types.ObjectId.isValid(sender)) {
            return res.status(400).json({ message: 'Invalid sender ID' });
        }

        if (!body) {
            return res.status(400).json({ message: 'Message body is required' });
        }

        const messageSender = await User.findById(sender);
        const chat = await Chat.findById(chatId);

        if (!messageSender) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        const newMessage = new Message({
            sender,
            body
        });

        await newMessage.save();

        chat.messages.push(newMessage);
        await chat.save();

        res.status(200).json({_id: newMessage._id, message: 'Message added to chat' });
    } catch (err) {
        console.error('Error adding message to chat:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /message by Id
const getMessage = async (req, res) => {
    try {
        const messageId = req.params.id;

        if (!messageId || !mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({ message: 'Invalid message ID' });
        }

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (err) {
        console.error('Error fetching chat by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE /chats by Id
//deletes chat and all messages in it
// DELETE /chats by Id
//deletes chat and all messages in it
const deleteChat = async (req, res ) => {
    try {
        const chatId = req.params.id;


        if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ message: 'Invalid chat ID' });
        }

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

    
        await Message.deleteMany({ _id: { $in: chat.messages } });
        await chat.remove();

        res.status(200).json({ message: 'Chat deleted' });
    } catch (err) {
        console.error('Error deleting chat:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const controller = {
    createChat,
    getChat,
    getMessages,
    getChatsBySeller,
    getChatsByBuyer,
    addMessage,
    getMessage,
    deleteChat
};

module.exports = controller;