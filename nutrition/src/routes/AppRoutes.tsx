import { Routes, Route } from 'react-router-dom';
import Home from './../pages/Home/home';
import Notifications from './../pages/Notifications/notification';
import Repas from './../pages/Repas/repas';
import Profile from './../pages/Profile/profile';
import Quiz from './../pages/Quiz/quiz';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/repas" element={<Repas />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
};