import './styles.css';
import React, { useState } from "react";

interface PatientFormData {
  name: string;
  cpf: string;
  rg?: string;
  gender: string;
  birthDate: string;
  phone: string;
  emergencyPhone: string;
  email?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  healthInfo: {
    comorbidities?: string;
    allergies?: string;
    medications?: string;
    dietaryRestrictions?: string;
    healthPlan?: string;
  };
  family: {
    responsibleName: string;
    relation: string;
    responsiblePhone: string;
    responsibleEmail?: string;
  };
  admissionDate: string;
  maritalStatus: string;
  religion?: string;
  notes?: string;
  photo?: string; // Campo para armazenar o caminho da foto
}

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    cpf: "",
    rg: "",
    gender: "",
    birthDate: "",
    phone: "",
    emergencyPhone: "",
    email: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
    healthInfo: {
      comorbidities: "",
      allergies: "",
      medications: "",
      dietaryRestrictions: "",
      healthPlan: "",
    },
    family: {
      responsibleName: "",
      relation: "",
      responsiblePhone: "",
      responsibleEmail: "",
    },
    admissionDate: "",
    maritalStatus: "",
    religion: "",
    notes: "",
    photo: "", // Inicialmente vazio
  });

  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aqui você pode lidar com o arquivo, como fazer upload para o servidor, ou apenas salvar no estado local.
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result as string, // Armazenando a foto como uma URL base64
        }));
      };
      reader.readAsDataURL(file); // Converte a imagem em base64
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof PatientFormData] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setIsModalOpen(false); // Fecha o modal ao enviar o formulário
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='container-cadastrar-paciente'>
      {/* Botão para abrir o modal */}
      <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
        Cadastrar Paciente
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={handleCloseModal} // Fecha ao clicar no fundo
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Impede o clique no conteúdo de fechar o modal
          >
            <button className="close-modal-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Cadastro de Paciente</h2>
            <form className="patient-form" onSubmit={handleSubmit}>

            <fieldset>
                <legend>Foto do Paciente</legend>
                <label>
                  Carregar foto:
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                {formData.photo && (
                  <div>
                    <img src={formData.photo} alt="Paciente" style={{ width: "150px", height: "auto" }} />
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend>Dados Pessoais</legend>
                <label>
                  Nome completo:
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                  CPF:
                  <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
                </label>
                <label>
                  RG:
                  <input type="text" name="rg" value={formData.rg} onChange={handleChange} />
                </label>
                <label>
                  Sexo:
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Selecione</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                  </select>
                </label>
                <label>
                  Data de nascimento:
                  <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
                </label>
              </fieldset>
              <fieldset>
                <legend>Contato do Responsável</legend>
                <label>
                  Nome do responsável:
                  <input
                    type="text"
                    name="family.responsibleName"
                    value={formData.family.responsibleName}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Parentesco:
                  <input
                    type="text"
                    name="family.relation"
                    value={formData.family.relation}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Telefone do responsável:
                  <input
                    type="tel"
                    name="family.responsiblePhone"
                    value={formData.family.responsiblePhone}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  E-mail do responsável:
                  <input
                    type="email"
                    name="family.responsibleEmail"
                    value={formData.family.responsibleEmail}
                    onChange={handleChange}
                  />
                </label>
              </fieldset>

              <fieldset>
                <legend>Endereço</legend>
                <label>
                  Rua:
                  <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} required />
                </label>
                <label>
                  Número:
                  <input type="text" name="address.number" value={formData.address.number} onChange={handleChange} required />
                </label>
                <label>
                  Complemento:
                  <input type="text" name="address.complement" value={formData.address.complement} onChange={handleChange} />
                </label>
                <label>
                  Bairro:
                  <input type="text" name="address.neighborhood" value={formData.address.neighborhood} onChange={handleChange} required />
                </label>
                <label>
                  Cidade:
                  <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} required />
                </label>
                <label>
                  Estado:
                  <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} required />
                </label>
                <label>
                  CEP:
                  <input type="text" name="address.zipCode" value={formData.address.zipCode} onChange={handleChange} required />
                </label>
              </fieldset>

              <fieldset>
                <legend>Informações de Saúde</legend>
                <label>
                  Comorbidades:
                  <textarea
                    name="healthInfo.comorbidities"
                    value={formData.healthInfo.comorbidities}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Alergias:
                  <textarea
                    name="healthInfo.allergies"
                    value={formData.healthInfo.allergies}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Medicações:
                  <textarea
                    name="healthInfo.medications"
                    value={formData.healthInfo.medications}
                    onChange={handleChange}
                  />
                </label>
              </fieldset>

             
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientForm;
