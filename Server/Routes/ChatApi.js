const express = require('express');
const router = express.Router();
const Chat = require('../Models/Chat');
const controller = require('../Controllers/ChatController');

router.post('/', controller.createChat);
router.get('/:id', controller.getChat);
router.get('/messages/:id', controller.getMessages)
router.get('/seller/:id', controller.getChatsBySeller);
router.get('/buyer/:id', controller.getChatsByBuyer);
router.get('/message/:id', controller.getMessage);
router.delete('/:id', controller.deleteChat);
router.put('/:id', controller.addMessage);

module.exports = router;