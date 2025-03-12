const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator'); // Importation de la méthode check et validationResult
const winston = require('winston'); // Importation de Winston pour les logs

const router = express.Router();

// Configuration de Winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'forumTop.log' })
    ]
});

// Inscription
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = requestAnimationFrame.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword }); // Création d'un nouvel utilisateur
        await newUser.save(); // Sauvegarde de l'utilisateur dans la base de données
        res.json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Connexion
router.post('/login',
    [
        check('email', 'Veuillez entrer une adresse email valide').isEmail(), // Vérification de l'email
        check('password', 'Veuillez entrer un mot de passe').exists() // Vérification du mot de passe
    ],
    async (req, res) => {
        const errors = validationResult(req); // Vérification des erreurs
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    try {
        const { email, password } = req.body; // Récupération des données de la requête
        const user = await User.findOne({ email }); // Recherche de l'utilisateur dans la base de données
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Comparaison des mots de passe
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' }); // Si les mots de passe ne correspondent pas (!)

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Création du token et expiration de 1h
        res.json({ token, userId: user._id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

});

module.exports = router; 