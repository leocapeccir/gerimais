import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs'; // Importa o dayjs
import './styles.css';

// Interface para os visitantes
interface Visitor {
  rg: string;
  name: string;
  personVisiting: string;
  date: string; // Data associada ao visitante
  time: string; // Hora de chegada do visitante
}

function VisitorsCalendar() {
  // Definindo a data de hoje como a data selecionada
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs()); // Data de hoje por padrão
  const [visitors, setVisitors] = useState<Visitor[]>([]); // Lista de visitantes
  const [openDialog, setOpenDialog] = useState(false); // Controle do Dialog
  const [newVisitor, setNewVisitor] = useState<Visitor>({
    rg: '',
    name: '',
    personVisiting: '',
    date: '', // A data pode ser associada ao novo visitante
    time: '', // Hora inicial
  }); // Novo visitante
  const [showCalendar, setShowCalendar] = useState(false); // Controle da exibição do calendário

  // Função para abrir o Dialog de adicionar visitante
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Função para fechar o Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Função para adicionar um novo visitante
  const handleAddVisitor = () => {
    if (newVisitor.rg && newVisitor.name && newVisitor.personVisiting) {
      const currentTime = dayjs().format('HH:mm'); // Hora atual

      // Adiciona o visitante com a data de hoje e hora atual
      setVisitors((prevVisitors) => [
        { ...newVisitor, date: selectedDate.format('YYYY-MM-DD'), time: currentTime }, 
        ...prevVisitors,
      ]);

      // Limpa o formulário e fecha o Dialog
      setNewVisitor({ rg: '', name: '', personVisiting: '', date: '', time: '' });
      setOpenDialog(false);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  // Função para lidar com mudanças nos campos do formulário de visitante
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVisitor((prev) => ({ ...prev, [name]: value }));
  };

  // Função para alternar a visibilidade do calendário
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Filtrar os visitantes pela data selecionada
  const filteredVisitors = visitors.filter(
    (visitor) => visitor.date === selectedDate.format('YYYY-MM-DD')
  );

  // Função para lidar com a mudança de data no calendário
  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      setSelectedDate(newDate);
    }
  };

  return (
    <div className="container-visitors">
      {/* Exibe o título "Visitantes" e a data atual ou filtrada */}

      {/* Lista de Visitantes */}
      <div className="lista-visitantes">
      <h3>
          Visitantes
          <span className="date-display">
            {showCalendar ? ` - Data Filtrada: ${selectedDate.format('DD/MM/YYYY')}` : ` ${dayjs().format('DD/MM/YYYY')}`}
          </span>
        </h3>
        <List>
          {filteredVisitors.length === 0 ? (
            <p>Nenhum visitante registrado para essa data.</p>
          ) : (
            filteredVisitors.map((visitor, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`RG: ${visitor.rg}`}
                  secondary={`Nome: ${visitor.name} | Visitando: ${visitor.personVisiting} | Hora: ${visitor.time}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </div>

      {/* Botão para exibir/ocultar o calendário e o filtro */}
      <div className="container-calendar" style={{ flexDirection: showCalendar ? 'column' : 'row' }}>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Adicionar Visitante
        </Button>

        <Button variant="outlined" onClick={toggleCalendar}>
          {showCalendar ? 'Fechar Calendário' : 'Filtrar por Data'}
        </Button>

        {/* Exibe o calendário apenas quando showCalendar for true */}
        {showCalendar && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar 
              value={selectedDate}
              onChange={handleDateChange} // Atualiza a data ao selecionar uma nova
            />
          </LocalizationProvider>
        )}
      </div>

      {/* Dialog para adicionar um visitante */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Adicionar Visitante</DialogTitle>
        <DialogContent>
          <TextField
            label="RG"
            name="rg"
            value={newVisitor.rg}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nome"
            name="name"
            value={newVisitor.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Pessoa que está visitando"
            name="personVisiting"
            value={newVisitor.personVisiting}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddVisitor} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VisitorsCalendar;
