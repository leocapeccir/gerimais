import { useState } from "react";
import "./styles.css";

function SideBarMenu() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { title: "Dashboard", icon: "src/assets/dashboard-svgrepo-com.svg" },
    { title: "teste", icon: "src/assets/visitor-identification-svgrepo-com.svg" },
    { title: "Dashboard", icon: "src/assets/dashboard-svgrepo-com.svg" },
    { title: "teste", icon: "src/assets/visitor-identification-svgrepo-com.svg" },
  ];

  return (
    <div className="flex">
      <div className={`sidebar ${open ? "open" : "closed"}`}>
        {/* Ícone de controle de abrir/fechar */}
        <img
          src="src/assets/menu-svgrepo-com.svg"
          className={`control-icon ${!open && "open"}`}
          onClick={() => setOpen(!open)}
          alt="Toggle Sidebar"
        />

        <div className="logo-container">
          <img
            src="src/assets/asilo.jpg"
            className={`logo ${open && "open"}`}
            alt="Logo"
          />
          <h1 className={`text-white ${!open ? "hidden" : ""}`}>Nosso Lar</h1>
        </div>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={`menu-item ${index === 0 ? "first-item" : ""}`}>
              {open ? (
                <div className="menu-content">
                  <img
                    src={item.icon}
                    className="menu-icon"
                    alt={item.title}
                  />
                  <span className="menu-title">{item.title}</span>
                </div>
              ) : (
                <img
                  src={item.icon}
                  className="menu-icon"
                  alt={item.title}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBarMenu;
