
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dashboardRoutes = require('./routes/dashboard'); 
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Import des routes
const authRoutes = require('./routes/auth');

// Utilisation des routes
app.use('/api/auth', authRoutes); // Toutes nos routes d'auth commenceront par /api/auth
app.use('/api/dashboard', dashboardRoutes);
// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Erreur de connexion :", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});