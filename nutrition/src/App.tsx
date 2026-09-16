import { useState } from "react";
import NavigationBar from "./components/navigationBar";
import Header from "./components/header";
import AppRoutes from "./routes/AppRoutes";

const COLORS = {
  fond: "#F2F4F7",
};

function App() {
  const [tab, setTab] = useState<string>("home");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      {/* Phone frame */}
      <div
        className="w-[380px] h-[780px] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border-8 border-black"
        style={{ backgroundColor: COLORS.fond }}
      >
        {/* 1. Header en haut */}
        <Header />

        {/* 2. Contenu scrollable : prend TOUT l'espace restant */}
        <div className="flex-1 overflow-y-auto">
          <AppRoutes />
        </div>

        {/* 3. NavigationBar en dernier → collée en bas grâce à flex-col */}
        <NavigationBar tab={tab} setTab={setTab} />
      </div>
    </div>
  );
}

export default App;