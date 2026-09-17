const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// Route accessible à TOUS les utilisateurs connectés
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: "Bienvenue sur votre profil !",
    user: req.user
  });
});

// Route accessible UNIQUEMENT aux Nutritionnistes
router.get('/nutritionniste', verifyToken, checkRole(['Nutri']), (req, res) => {
  res.json({
    message: "Bienvenue dans le panneau de gestion des nutritionnistes !"
  });
});

// Route accessible aux Préparateurs Physiques ET Nutritionnistes
router.get('/preparateur', verifyToken, checkRole(['PrepPhy', 'Nutri']), (req, res) => {
  res.json({
    message: "Bienvenue dans l'espace de gestion des préparateurs physiques !"
  });
});

// Route accessible aux Clients
router.get('/joueur', verifyToken, checkRole(['joueur']), (req, res) => {
  res.json({
    message: "Bienvenue sur votre espace joueur!"
  });
});

module.exports = router;