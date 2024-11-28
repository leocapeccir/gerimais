import "./styles.css";

export const PatientBox = () => {
  return (
    <div className="container-patient-box">
      <img
        className="patient-photo"
        src="src/assets/velho.jpg" // Coloque o link da foto do paciente ou use um arquivo local
        alt="Paciente"
      />
      <span className="patient-name">José Silva</span>
    </div>
  );
};

export default PatientBox;
