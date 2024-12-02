import './styles.css';
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Button,
  IconButton,
  Divider,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Medicamento {
  nome: string;
}

const EvolucaoPaciente: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [novoMedicamento, setNovoMedicamento] = useState("");
  const [humores, setHumores] = useState<{ [key: string]: string }>({});
  const [refeicoes, setRefeicoes] = useState<{ [key: string]: string }>({});
  const [data, setData] = useState<string>("");

  const adicionarMedicamento = () => {
    if (novoMedicamento) {
      setMedicamentos([...medicamentos, { nome: novoMedicamento }]);
      setNovoMedicamento("");
    }
  };

  const removerMedicamento = (index: number) => {
    const novosMedicamentos = medicamentos.filter((_, i) => i !== index);
    setMedicamentos(novosMedicamentos);
  };

  const handleRefeicaoChange = (refeicao: string, value: string) => {
    setRefeicoes({ ...refeicoes, [refeicao]: value });
  };

  const handleHumorChange = (refeicao: string, value: string) => {
    setHumores({ ...humores, [refeicao]: value });
  };

  return (
    <Box p={3} sx={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#f9f9f9", borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom>
        Evolução do Paciente
      </Typography>

      {/* Campo de data */}
      <Box mb={3}>
        <TextField
          label="Data"
          type="date"
          fullWidth
          value={data}
          onChange={(e) => setData(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Divider sx={{ marginY: 2 }} />

      {/* Refeições */}
      <Typography variant="h5" gutterBottom>
        Refeições
      </Typography>
      {["Café da manhã", "Lanche da manhã", "Almoço", "Lanche da tarde", "Jantar", "Ceia"].map((refeicao, index) => (
        <Box key={index} mb={3}>
          <Typography variant="h6">{refeicao}</Typography>

          {/* Consumo */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Consumo</FormLabel>
            <RadioGroup
              row
              value={refeicoes[refeicao] || ""}
              onChange={(e) => handleRefeicaoChange(refeicao, e.target.value)}
            >
              <FormControlLabel value="comeuTudo" control={<Radio />} label="Comeu Tudo" />
              <FormControlLabel value="repetiu" control={<Radio />} label="Repetiu" />
              <FormControlLabel value="naoComeu" control={<Radio />} label="Não Comeu" />
            </RadioGroup>
          </FormControl>

          {/* Humor */}
          <FormControl component="fieldset" sx={{ marginTop: 1 }}>
            <FormLabel component="legend">Humor</FormLabel>
            <RadioGroup
              row
              value={humores[refeicao] || ""}
              onChange={(e) => handleHumorChange(refeicao, e.target.value)}
            >
              <FormControlLabel value="triste" control={<Radio />} label="Triste" />
              <FormControlLabel value="bravo" control={<Radio />} label="Bravo" />
              <FormControlLabel value="indiferente" control={<Radio />} label="Indiferente" />
              <FormControlLabel value="alegre" control={<Radio />} label="Alegre" />
            </RadioGroup>
          </FormControl>
        </Box>
      ))}

      <Divider sx={{ marginY: 2 }} />

      {/* Pressão e Glicemia */}
      <Typography variant="h5" gutterBottom>
        Sinais Vitais
      </Typography>
      <Box mb={3}>
        <TextField
          label="Pressão (Ex.: 12/8)"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Glicemia (mg/dL)"
          fullWidth
        />
      </Box>

      <Divider sx={{ marginY: 2 }} />

      {/* Medicamentos */}
      <Typography variant="h5" gutterBottom>
        Medicamentos
      </Typography>
      <Box mb={3}>
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <TextField
            label="Adicionar Medicamento"
            value={novoMedicamento}
            onChange={(e) => setNovoMedicamento(e.target.value)}
            fullWidth
          />
          <IconButton color="primary" onClick={adicionarMedicamento}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>

        {medicamentos.map((medicamento, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ backgroundColor: "#fff", padding: 1, borderRadius: 1, marginBottom: 1 }}
          >
            <Typography>{medicamento.nome}</Typography>
            <IconButton color="error" onClick={() => removerMedicamento(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Divider sx={{ marginY: 2 }} />

      {/* Botão de salvar */}
      <Button variant="contained" color="primary" fullWidth>
        Salvar Rotina
      </Button>
    </Box>
  );
};

export default EvolucaoPaciente;
