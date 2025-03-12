const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Créer un nouveau message
router.post('/', async (requestAnimationFrame, res) => {
    try {
        const { content, author, topic } = req.body;
        const newMessage = new Message({ content, author, topic });
        await newMessage.save();
        res.json({newMessage});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer tous les messages d'un topic
router.get('/:topicId', async (req, res) => {
    const messages = await Message.find({ topic: req.params.topicId }).populate('author', 'username');
    res.json(messages);
});

module.exports = router;