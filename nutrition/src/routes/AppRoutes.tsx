import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Pages d'Authentification
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Unauthorized from '../pages/Unauthorized';

// Pages existantes
import Home from './../pages/Home/home';
import Notifications from './../pages/Notifications/notification';
import Repas from './../pages/Repas/repas';
import Profile from './../pages/Profile/profile';
import Quiz from './../pages/Quiz/quiz';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Routes Publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 2. Routes Protégées pour les Clients & Admins */}
      <Route element={<ProtectedRoute allowedRoles={['joueur']} />}>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/repas" element={<Repas />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />
      </Route>

      {/* 3. Routes réservées uniquement à l'Admin (si besoin) */}
      <Route element={<ProtectedRoute allowedRoles={['Nutri']} />}>
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['PrepPhy']} />}>
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      </Route>
    </Routes>
  );
}