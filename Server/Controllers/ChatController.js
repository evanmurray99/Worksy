const Chat = require('../Models/Chat');
const User = require('../Models/User');
const Message = require('../Models/Message');
const mongoose = require("mongoose");

// Create a new chat 
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
        res.status(500).json({ message: 'Internal server error '});
        
    }
};


// GET /chats by Id
const getChat = async (req, res) => {
    try {
        const chatId = req.params.id;
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


// GET /chats by seller id
//returns all chats where this user is a seller
const getChatsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.id;
        const chats = await Chat.find({ seller: sellerId });

        if (!chats) {
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
        const chats = await Chat.find({ buyer: buyerId });

        if (!chats) {
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

const deleteChat = async (req, res ) => {
    try {
        const chatId = req.params.id;
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
    getChatsBySeller,
    getChatsByBuyer,
    addMessage,
    getMessage,
    deleteChat
};

module.exports = controller;