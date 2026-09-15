import { Home, Calendar, Trophy, User, Bell, type LucideIcon } from "lucide-react";
import { useState } from "react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const COLORS = {
  principal: "#1B3A5C",
  accent: "#F2B134",
  succes: "#3C8F5C",
  alerte: "#E0A800",
  danger: "#B33A3A",
  fond: "#F2F4F7",
};

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 flex-1 py-2"
    >
      <Icon
        size={22}
        color={active ? COLORS.accent : "#9AA5B5"}
        strokeWidth={active ? 2.4 : 2}
      />
      <span
        className="text-[10px] font-medium"
        style={{ color: active ? COLORS.accent : "#9AA5B5" }}
      >
        {label}
      </span>
    </button>
  );
}

export default function NavigationBar() {
  const [tab, setTab] = useState<string>("home");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      {/* Phone frame */}
      <div
        className="w-[380px] h-[780px] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-between relative border-8 border-black"
        style={{ backgroundColor: COLORS.fond }}
      >
        {/* Header */}
        <div
          className="px-5 pt-6 pb-5 flex items-center justify-between"
          style={{ backgroundColor: COLORS.principal }}
        >
          <div>
            <p className="text-white/60 text-xs">Bonjour,</p>
            <h1 className="text-white text-lg font-bold">Karim</h1>
          </div>
          <div className="relative">
            <Bell size={22} color="white" />
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2"
              style={{
                backgroundColor: COLORS.accent,
                borderColor: COLORS.principal,
              }}
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          className="flex items-stretch border-t"
          style={{ backgroundColor: "white", borderColor: "#EDEFF2" }}
        >
          <NavItem
            icon={Home}
            label="Accueil"
            active={tab === "home"}
            onClick={() => setTab("home")}
          />
          <NavItem
            icon={Calendar}
            label="Calendrier"
            active={tab === "cal"}
            onClick={() => setTab("cal")}
          />
          <NavItem
            icon={Trophy}
            label="Classement"
            active={tab === "rank"}
            onClick={() => setTab("rank")}
          />
          <NavItem
            icon={User}
            label="Profil"
            active={tab === "profile"}
            onClick={() => setTab("profile")}
          />
        </div>
      </div>
    </div>
  );
}