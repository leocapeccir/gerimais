import React from "react";
import "./styles.css";
import PatientBox from "../../components/PatientBox";

function Home() {
  return (
    <>
    <h1 className="title-patient">Pacientes da Casa</h1>

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
