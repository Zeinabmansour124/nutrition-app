import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName = "Karim" }: HeaderProps) {
  return (
    <div className="app-header">
      <div>
        <p className="app-header-greeting">Bonjour,</p>
        <h1 className="app-header-name">{userName}</h1>
      </div>
      <div className="app-header-bell-wrap">
        <Link to="/notifications" aria-label="Notifications">
          <Bell size={22} color="white" />
        </Link>
        <span className="app-header-bell-dot" />
      </div>
    </div>
  );
}