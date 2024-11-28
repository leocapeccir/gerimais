import React from "react";
import "./styles.css";

interface SideBarMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onMenuClick: (name: string, path: string) => void; // Função para passar o nome e o caminho
}

function SideBarMenu({ open, setOpen, onMenuClick }: SideBarMenuProps) {
  const menuItems = [
    { title: "Dashboard", icon: "src/assets/dashboard-svgrepo-com.svg", path: "/" },
    { title: "Visitantes", icon: "src/assets/id-card-svgrepo-com (1).svg", path: "/visitantes" },
    // { title: "Configurações", icon: "src/assets/id-card-svgrepo-com (1).svg", path: "/configuracoes" },
    // { title: "Ajuda", icon: "src/assets/id-card-svgrepo-com (1).svg", path: "/ajuda" },
  ];

  return (
    <div className="flex">
      <div className={`sidebar ${open ? "open" : "closed"}`}>
        <img
          id="menu-icon"
          src="src/assets/menu-svgrepo-com (2).svg"
          className={`control-icon ${!open && "open"} ${open ? "rotate" : ""}`}  // Adicionando a rotação aqui
          onClick={() => setOpen(!open)} // Alterna estado ao clicar
          alt="Toggle Sidebar"
        />

        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${index === 0 ? "first-item" : ""}`}
              onClick={() => onMenuClick(item.title, item.path)} // Chama a função onMenuClick
            >
              {open ? (
                <div className="menu-content">
                  <img src={item.icon} className="menu-icon" alt={item.title} />
                  <span className="menu-title">{item.title}</span>
                </div>
              ) : (
                <img src={item.icon} className="menu-icon" alt={item.title} />
              )}
            </li>
          ))}
        </ul>
        <div className="logo-empresa">
          <img
            id="logo-marca"
            src="src/assets/logooficial2grande.png"
            className={`logo-menu-marca ${open && "open"}`}
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
}

export default SideBarMenu;
