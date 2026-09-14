import { useState } from "react";
import { Home, Calendar, Trophy, User, Bell, Plus } from "lucide-react";

const COLORS = {
  principal: "#1B3A5C",
  accent: "#F2B134",
  succes: "#3C8F5C",
  alerte: "#E0A800",
  danger: "#B33A3A",
  fond: "#F2F4F7",
};

const matches = [
  { id: 1, opponent: "AS Monastir", date: "Auj. 18:00", score: "2 - 1", status: "victoire" },
  { id: 2, opponent: "CS Sfaxien", date: "Sam. 20:00", score: "1 - 1", status: "nul" },
  { id: 3, opponent: "Étoile du Sahel", date: "22 Sept", score: "0 - 3", status: "defaite" },
  { id: 4, opponent: "Club Africain", date: "28 Sept", score: "à venir", status: "attente" },
];

const statusMap = {
  victoire: { label: "Victoire", color: COLORS.succes },
  nul: { label: "Nul", color: COLORS.alerte },
  defaite: { label: "Défaite", color: COLORS.danger },
  attente: { label: "À venir", color: "#8A94A6" },
};

function StatusBadge({ status }) {
  const s = statusMap[status];
  return (
    <span
      className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
      style={{ backgroundColor: s.color }}
    >
      {s.label}
    </span>
  );
}

function MatchCard({ match }) {
  return (
    <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-[15px]" style={{ color: COLORS.principal }}>
          vs {match.opponent}
        </span>
        <span className="text-xs text-gray-500">{match.date}</span>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="font-bold text-sm" style={{ color: COLORS.principal }}>
          {match.score}
        </span>
        <StatusBadge status={match.status} />
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
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

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      {/* Phone frame */}
      <div
        className="w-[380px] h-[780px] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col relative border-8 border-black"
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
              style={{ backgroundColor: COLORS.accent, borderColor: COLORS.principal }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
          {/* Highlight card */}
          <div
            className="rounded-2xl p-4 flex items-center justify-between"
            style={{ backgroundColor: COLORS.accent }}
          >
            <div>
              <p className="text-[13px] font-semibold" style={{ color: COLORS.principal }}>
                Prochain match
              </p>
              <p className="text-xs mt-0.5" style={{ color: COLORS.principal }}>
                vs Club Africain — 28 Sept
              </p>
            </div>
            <div
              className="px-3 py-2 rounded-xl text-xs font-bold text-white"
              style={{ backgroundColor: COLORS.principal }}
            >
              Détails
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-500 mt-1">Derniers résultats</p>

          <div className="flex flex-col gap-3">
            {matches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </div>

        {/* Floating action button */}
        <button
          className="absolute bottom-24 right-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus size={26} color={COLORS.principal} strokeWidth={2.6} />
        </button>

        {/* Bottom nav */}
        <div
          className="flex items-stretch border-t"
          style={{ backgroundColor: "white", borderColor: "#EDEFF2" }}
        >
          <NavItem icon={Home} label="Accueil" active={tab === "home"} onClick={() => setTab("home")} />
          <NavItem icon={Calendar} label="Calendrier" active={tab === "cal"} onClick={() => setTab("cal")} />
          <NavItem icon={Trophy} label="Classement" active={tab === "rank"} onClick={() => setTab("rank")} />
          <NavItem icon={User} label="Profil" active={tab === "profile"} onClick={() => setTab("profile")} />
        </div>
      </div>
    </div>
  );
}