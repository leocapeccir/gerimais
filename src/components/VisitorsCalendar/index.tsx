import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Dayjs } from 'dayjs';
import { Button, TextField, Modal, Box } from '@mui/material';

// Definindo os tipos de visitantes
interface Visitor {
  name: string;
  rg: string;
  patientName: string;
}

 function VisitorCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [visitors, setVisitors] = React.useState<Visitor[]>([]); // Lista de visitantes para a data selecionada
  const [isModalOpen, setIsModalOpen] = React.useState(false); // Estado para controlar a abertura do modal
  const [newVisitor, setNewVisitor] = React.useState<Visitor>({
    name: '',
    rg: '',
    patientName: '',
  });

  // Função para selecionar uma data no calendário
  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    if (newDate) {
      loadVisitorsForDate(newDate); // Carrega os visitantes para a data selecionada
    }
  };

  // Função para carregar os visitantes para a data selecionada
  const loadVisitorsForDate = (date: Dayjs) => {
    // Lógica fictícia para carregar os visitantes de uma data
    // Você pode substituir isso com uma chamada para API ou banco de dados
    const mockVisitors: Visitor[] = [
      { name: 'João da Silva', rg: '123456789', patientName: 'Maria Souza' },
      { name: 'Ana Pereira', rg: '987654321', patientName: 'José Oliveira' },
    ];
    setVisitors(mockVisitors); // Atualiza a lista de visitantes
  };

  // Função para abrir o modal de cadastro de visitante
  const openModal = () => setIsModalOpen(true);

  // Função para fechar o modal de cadastro
  const closeModal = () => setIsModalOpen(false);

  // Função para lidar com o envio do formulário de cadastro de visitante
  const handleVisitorSubmit = () => {
    if (newVisitor.name && newVisitor.rg && newVisitor.patientName) {
      // Adiciona o novo visitante à lista
      setVisitors([...visitors, newVisitor]);
      setNewVisitor({ name: '', rg: '', patientName: '' }); // Reseta os campos
      closeModal(); // Fecha o modal
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        {/* Calendário */}
        <DateCalendar value={selectedDate} onChange={handleDateChange} />

        {/* Lista de Visitantes */}
        {selectedDate && (
          <div>
            <h2>Visitantes para {selectedDate.format('DD/MM/YYYY')}</h2>
            <ul>
              {visitors.map((visitor, index) => (
                <li key={index}>
                  {visitor.name} - {visitor.rg} (Paciente: {visitor.patientName})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Botão para abrir o modal */}
        <Button variant="contained" color="primary" onClick={openModal}>
          Cadastrar Visitante
        </Button>

        {/* Modal para cadastrar visitante */}
        <Modal open={isModalOpen} onClose={closeModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              borderRadius: '8px',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2>Cadastro de Visitante</h2>
            <TextField
              label="Nome do Visitante"
              fullWidth
              value={newVisitor.name}
              onChange={(e) =>
                setNewVisitor({ ...newVisitor, name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="RG do Visitante"
              fullWidth
              value={newVisitor.rg}
              onChange={(e) =>
                setNewVisitor({ ...newVisitor, rg: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Nome do Paciente"
              fullWidth
              value={newVisitor.patientName}
              onChange={(e) =>
                setNewVisitor({ ...newVisitor, patientName: e.target.value })
              }
              margin="normal"
            />
            <div style={{ marginTop: '16px' }}>
              <Button variant="contained" color="primary" onClick={handleVisitorSubmit}>
                Salvar Visitante
              </Button>
              <Button variant="outlined" color="secondary" onClick={closeModal} style={{ marginLeft: '8px' }}>
                Cancelar
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </LocalizationProvider>
  );
}

export default VisitorCalendar;