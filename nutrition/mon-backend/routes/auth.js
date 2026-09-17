const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const AllowedEmail = require('../models/AllowedEmail');

// ==========================================
// 1. ROUTE D'INSCRIPTION (REGISTER)
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe." });
    }

    // A. Vérifier si l'email fait partie de la liste blanche
    const allowed = await AllowedEmail.findOne({ email: email.toLowerCase() });
    if (!allowed) {
      return res.status(403).json({ message: "Accès refusé. Cet email n'est pas autorisé à s'inscrire." });
    }

    // B. Vérifier si le compte n'existe pas déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Un compte existe déjà avec cet email." });
    }

    // C. Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // D. Créer le nouvel utilisateur avec le rôle défini dans la liste blanche
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      role: allowed.role
    });

    await newUser.save();

    res.status(201).json({ message: "Compte créé avec succès ! Vous pouvez vous connecter." });

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de l'inscription.", error: error.message });
  }
});

// ==========================================
// 2. ROUTE DE CONNEXION (LOGIN)
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe." });
    }

    // A. Chercher l'utilisateur dans la base
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Identifiants invalides (email ou mot de passe incorrect)." });
    }

    // B. Comparer le mot de passe entré avec le mot de passe haché en base
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Identifiants invalides (email ou mot de passe incorrect)." });
    }

    // C. Générer le Token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // D. Renvoyer le token et le rôle à React
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la connexion.", error: error.message });
  }
});

module.exports = router;