// Mise en place du serveur Express
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const helmet = require('helmet'); // Importation de Helmet pour sécuriser les en-têtes HTTP

const app = express();
app.use(express.json());
app.use(cors({ 
// app.use(helmet()); // Utilisation de Helmet
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Pour éviter les warnings dans la console
    useUnifiedTopology: true // Pour éviter les warnings dans la console
}).then(() => console.log('Connecté à MongoDB')) // Si la connexion est établie
.catch(err => console.log(err)); // Si la connexion échoue

app.get('/', (req, res) => { // Route pour tester si le serveur fonction
    res.json({ message: 'Hello World' }); 
})

// Demarrage du serveur
const PORT = process.env.PORT || 5000; // Port du serveur
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`)); // Message de confirmation du démarrage du serveur

// Liaison des routes au serveur principal
app.use('/api/users', require('./routes/users'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/messages', require('./routes/messages'));
