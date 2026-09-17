// seed.js
const mongoose = require('mongoose');
const AllowedEmail = require('./models/AllowedEmail');
require('dotenv').config();

// Liste des emails et des rôles à autoriser
const emailsAAutoriser = [
  { email: 'nutritionniste@test.com', role: 'Nutri' },
  { email: 'preparateur@test.com', role: 'PrepPhy' },
  { email: 'joueur@test.com', role: 'joueur' }
];

const ajouterEmails = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Insère les emails dans la base
    await AllowedEmail.insertMany(emailsAAutoriser);
    console.log("Emails autorisés ajoutés avec succès !");
    
    // Ferme la connexion
    mongoose.connection.close();
  } catch (error) {
    console.error("Erreur lors de l'insertion :", error);
  }
};

ajouterEmails();