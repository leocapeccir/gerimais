import React, { useState } from 'react';
import "./styles.css";
import PatientBox from "../../components/PatientBox";
import PatientForm from "../../components/PatientForm";

// Simulação de lista de pacientes (substitua com a sua fonte de dados real)
const patientsList = [
  { id: 1, name: "João Silva" },
  { id: 2, name: "Maria Oliveira" },
  { id: 3, name: "Carlos Souza" },
  { id: 4, name: "Ana Costa" },
  { id: 5, name: "Felipe Rocha" },
  { id: 6, name: "Beatriz Almeida" },
  { id: 7, name: "Gustavo Pereira" },
  { id: 8, name: "Renata Lima" },
  { id: 9, name: "Eduardo Martins" }
];

function Home() {
  // Estado para armazenar o nome do paciente a ser pesquisado
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtra os pacientes conforme o nome com base na pesquisa
  const filteredPatients = patientsList.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Função para atualizar a pesquisa conforme o usuário digita
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <h1 className="title-patient">Pacientes da Casa</h1>
      
      <div className="container-home">
        {/* Formulário de cadastro de paciente */}
        <div className="patient-form-container">
          
          <PatientForm />
             <img className='menu-icon icon-search' src="src\assets\search-svgrepo-com.svg" alt="lupa" />
           <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar paciente por nome"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        </div>

        {/* Campo de busca de pacientes */}
       

        {/* Lista de pacientes */}
        <div className="patient-list">
          <div className="list">
            {/* Renderiza os pacientes filtrados */}
            {filteredPatients.length === 0 ? (
              <p>Nenhum paciente encontrado.</p>
            ) : (
              filteredPatients.map((patient) => (
                <PatientBox key={patient.id} patient={patient} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
