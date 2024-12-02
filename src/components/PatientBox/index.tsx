import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

interface PatientProps {
  patient: {
    id: number;
    name: string;
    photo?: string; // Foto opcional
  };
}

const PatientBox: React.FC<PatientProps> = ({ patient }) => {
  const navigate = useNavigate(); // Hook para navegação programada

  const handleClick = () => {
    navigate(`/evolucao/${patient.id}`); // Redireciona para a tela de evolução com o ID do paciente
  };

  return (
    <div className="container-patient-box" onClick={handleClick}>
      <img
        className="patient-photo"
        src={patient.photo || "src/assets/velho.jpg"} // Foto padrão
        alt={patient.name}
      />
      <span className="patient-name">{patient.name}</span>
    </div>
  );
};

export default PatientBox;
