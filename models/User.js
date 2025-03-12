const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    }, // Nom d'utilisateur unique
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }, // Mot de passe chiffré
    createdAt: {
        type: Date,
        default: Date.now
    } // Date de création du compte
});

module.exports = mongoose.model('User', userSchema); // Export du modèle User