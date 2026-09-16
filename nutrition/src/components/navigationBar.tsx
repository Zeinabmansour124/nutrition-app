import type { LucideIcon } from "lucide-react";
import { Home, Utensils, Trophy, User } from "lucide-react";
import { Link } from "react-router-dom";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="bottom-nav-item"
      aria-current={active ? "page" : undefined}
    >
      <Icon
        size={22}
        color={active ? "var(--color-accent)" : "var(--color-muted)"}
        strokeWidth={active ? 2.4 : 2}
      />
      <span
        className={`bottom-nav-label ${
          active ? "bottom-nav-label--active" : "bottom-nav-label--inactive"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

interface NavigationBarProps {
  tab: string;
  setTab: (tab: string) => void;
}

const NAV_ITEMS = [
  { key: "home", to: "/", icon: Home, label: "Accueil" },
  { key: "repas", to: "/repas", icon: Utensils, label: "Repas" },
  { key: "quiz", to: "/quiz", icon: Trophy, label: "Quiz" },
  { key: "profile", to: "/profile", icon: User, label: "Profile" },
] as const;

export default function NavigationBar({ tab, setTab }: NavigationBarProps) {
  return (
    <nav className="bottom-nav" >
      {NAV_ITEMS.map(({ key, to, icon, label }) => (
        <Link key={key} to={to} className="bottom-nav-link">
          <NavItem
            icon={icon}
            label={label}
            active={tab === key}
            onClick={() => setTab(key)}
          />
        </Link>
      ))}
    </nav>
  );
}