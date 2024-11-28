import React from "react";
import "./styles.css";

interface HeaderProps {
  open: boolean;
  pageName: string;
}

function Header({ open, pageName }: HeaderProps) {
  const nome = "Carlos";

  return (
    <div
      id="header"
      style={{
        marginLeft: open ? "160px" : "0px", // Ajusta margem com base no estado
        transition: "margin-left 0.3s ease",
      }}
    >
      <div className="backPage">
        <img
          className="seta setaLeft"
          src="src/assets/arrow-left-svgrepo-com.svg"
          alt="Voltar"
        />
        <h1 id="pageName">{pageName}</h1>
      </div>

      <div className="profileContainer" style={{ marginRight: open ? "140px" : "0px"}}>
        <img
          className="profilePic"
          src="src/assets/profile-circle-svgrepo-com (1).svg"
          alt="Foto de perfil"
        />
        <span>{`Olá ${nome}`}</span>
        <img
          className="seta"
          src="src/assets/arrow-down-svgrepo-com.svg"
          alt="Abrir menu"
        />
      </div>
    </div>
  );
}

export default Header;
