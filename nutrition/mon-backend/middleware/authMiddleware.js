const jwt = require('jsonwebtoken');

// 1. Vérifier si le token JWT est présent et valide
const verifyToken = (req, res, next) => {
  // Récupérer le header "Authorization" (Format: "Bearer MON_TOKEN_JWT")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // S'il n'y a pas de token dans la requête
  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
  }

  try {
    // Vérification de la signature du token avec notre phrase secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // On attache les infos décodées (id et role) à l'objet 'req' pour les routes suivantes
    req.user = decoded;
    
    next(); // On laisse passer la requête vers l'étape suivante
  } catch (error) {
    return res.status(403).json({ message: "Token invalide ou expiré." });
  }
};

// 2. Vérifier si le rôle de l'utilisateur correspond aux rôles autorisés
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // req.user est disponible grâce au middleware verifyToken exécuté juste avant
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Accès interdit. Votre rôle (${req.user ? req.user.role : 'inconnu'}) n'a pas les privilèges requis.` 
      });
    }
    next(); // L'utilisateur a le bon rôle, on le laisse passer
  };
};

module.exports = { verifyToken, checkRole };