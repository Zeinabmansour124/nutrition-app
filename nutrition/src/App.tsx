import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import Header from "./components/header";
import AppRoutes from "./routes/AppRoutes";

const COLORS = {
  fond: "#F2F4F7",
};

function App() {
  const [tab, setTab] = useState<string>("home");
  const location = useLocation();

  // Masquer Header et NavigationBar sur les pages hors-session
  const hideLayout = ["/login", "/register", "/unauthorized"].includes(location.pathname);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      {/* Frame du smartphone */}
      <div
        className="w-[380px] h-[780px] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border-8 border-black"
        style={{ backgroundColor: COLORS.fond }}
      >
        {/* 1. Header (affiché uniquement si connecté) */}
        {!hideLayout && <Header />}

        {/* 2. Contenu principal scrollable */}
        <div className="flex-1 overflow-y-auto">
          <AppRoutes />
        </div>

        {/* 3. NavigationBar (affichée uniquement si connecté) */}
        {!hideLayout && <NavigationBar tab={tab} setTab={setTab} />}
      </div>
    </div>
  );
}

export default App;