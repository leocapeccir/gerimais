// src/App.tsx
import "./styles/globalStyles.css";
import SideBarMenu from "./components/SideBarMenu";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useState } from "react";
import Home from "./pages/Home";
import VisitorsCalendar from "./components/VisitorsCalendar";


function App() {
  const [open, setOpen] = useState(true); // Estado controlado pelo App
  const [pageName, setPageName] = useState("Dashboard"); // Estado para controlar o nome da página
  const navigate = useNavigate(); // Hook para navegação

  const handleMenuClick = (name: string, path: string) => {
    setPageName(name); // Atualiza o nome da página
    navigate(path); // Navega para o caminho especificado
  };

  return (
    <div className="layout-container">
      <Header open={open} pageName={pageName} />
      <SideBarMenu open={open} setOpen={setOpen} onMenuClick={handleMenuClick} />
      <main className={`main-content ${open ? "sidebar-open" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visitantes" element={<VisitorsCalendar/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
