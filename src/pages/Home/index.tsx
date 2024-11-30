import "./styles.css";
import PatientBox from "../../components/PatientBox";
import PatientForm from "../../components/PatientForm";

function Home() {
  return (
    <>
    <h1 className="title-patient">Pacientes da Casa</h1>
<PatientForm/>
    <div className="container-home">
      <div className="patient-list">
        <div className="list">

      <PatientBox />
      <PatientBox />
      <PatientBox />
      <PatientBox />
      <PatientBox />
      <PatientBox />
      <PatientBox />
      <PatientBox />
      <PatientBox />


        </div>


      </div>
    </div>
    </>

  );
}

export default Home;
