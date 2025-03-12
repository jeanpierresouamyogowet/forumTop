const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// Créer un nouveau sujet
router.post('/', async (req, res) => {
    try {
        const { title, author } = req.body;
        const slug = title.toLowerCase().replace(/\s+/g, '-'); // Création du slug
        const newTopic = new Topic({ title, slug, author });
        await newTopic.save();
        res.json({ message: 'Sujet créé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer tous les sujets
router.get('/', async (req,res) => {
    const topics = await Topic.find().populate('author', 'username');
    res.json(topics);
});

module.exports = router;