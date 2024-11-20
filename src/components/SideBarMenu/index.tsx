import { useState } from "react";
import "./styles.css";

function SideBarMenu() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div className={`sidebar ${open ? "open" : "closed"}`}>
        <img
          src="src\assets\menu-svgrepo-com.svg"
          className={`control-icon ${!open && "open"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="logo-container">
          <img
            src="src\assets\asilo.jpg"
            className={`logo ${open && "open"}`}
          />
          <h1 className={`text-white ${!open ? "hidden" : ""}`}>Nosso Lar</h1>
        </div>
        <ul>
            
          <li className="dashboard-title">Dashboard</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
        </ul>
      </div>
    </div>
  );
}

export default SideBarMenu;
