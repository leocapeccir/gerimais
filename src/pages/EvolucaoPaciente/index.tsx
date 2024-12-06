import React, { useState, useEffect } from "react";
import './styles.css'

// Definindo as interfaces
interface Medicamento {
  nome: string;
}

interface SinaisVitais {
  pressao: string;
  glicemia: string;
  medicamentos: Medicamento[];
  novoMedicamento: string;
}

const EvolucaoPaciente: React.FC = () => {
  const [humores, setHumores] = useState<{ [key: string]: string }>({});
  const [refeicoes, setRefeicoes] = useState<{ [key: string]: string }>({});
  const [sinaisVitais, setSinaisVitais] = useState<{ [key: string]: SinaisVitais }>({});
  const [data, setData] = useState<string>("");
  const [observacoes, setObservacoes] = useState('');


  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0];
    setData(hoje);
  }, []);

  const handleRefeicaoChange = (refeicao: string, value: string) => {
    setRefeicoes({ ...refeicoes, [refeicao]: value });
  };

  const handleHumorChange = (refeicao: string, value: string) => {
    setHumores({ ...humores, [refeicao]: value });
  };

  const handleSinaisVitaisChange = (
    refeicao: string,
    campo: keyof SinaisVitais,
    valor: string | Medicamento[]
  ) => {
    setSinaisVitais({
      ...sinaisVitais,
      [refeicao]: {
        ...sinaisVitais[refeicao],
        [campo]: valor,
      },
    });
  };

  const adicionarMedicamento = (refeicao: string) => {
    const vitais = sinaisVitais[refeicao] || { pressao: "", glicemia: "", medicamentos: [], novoMedicamento: "" };
    if (vitais.novoMedicamento) {
      const novosMedicamentos = [...(vitais.medicamentos || []), { nome: vitais.novoMedicamento }];
      handleSinaisVitaisChange(refeicao, "medicamentos", novosMedicamentos);
      handleSinaisVitaisChange(refeicao, "novoMedicamento", "");
    }
  };

  const removerMedicamento = (refeicao: string, index: number) => {
    const vitais = sinaisVitais[refeicao] || { pressao: "", glicemia: "", medicamentos: [] };
    const novosMedicamentos = vitais.medicamentos.filter((_, i) => i !== index);
    handleSinaisVitaisChange(refeicao, "medicamentos", novosMedicamentos);
  };

  return (
    <>
    <div className="container">
      <h2>Evolução do Paciente</h2>

      <div className="campo-data">
        <label htmlFor="data">Data</label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      <hr />

      <h3>Refeições</h3>
      <div className="refeicoes">
        {["Café da manhã", "Lanche da manhã", "Almoço", "Lanche da tarde", "Jantar", "Ceia"].map((refeicao, index) => (
          <div key={index} className="refeicao">
            <h4>{refeicao}</h4>

            <div className="campo-consumo">
              <label>Consumo</label>
              <div className="radio-group">
                {["comeuTudo", "repetiu", "naoComeu"].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name={`consumo-${refeicao}`}
                      value={value}
                      checked={refeicoes[refeicao] === value}
                      onChange={(e) => handleRefeicaoChange(refeicao, e.target.value)}
                    />
                    {value === "comeuTudo" ? "Comeu Tudo" : value === "repetiu" ? "Repetiu" : "Não Comeu"}
                  </label>
                ))}
              </div>
            </div>

            <div className="campo-humor">
              <label>Humor</label>
              <div className="radio-group">
                {["triste", "bravo", "indiferente", "alegre"].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name={`humor-${refeicao}`}
                      value={value}
                      checked={humores[refeicao] === value}
                      onChange={(e) => handleHumorChange(refeicao, e.target.value)}
                    />
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className="campo-sinais-vitais">
              <label>Pressão</label>
              <input
                type="text"
                placeholder="Ex.: 12/8"
                value={sinaisVitais[refeicao]?.pressao || ""}
                onChange={(e) => handleSinaisVitaisChange(refeicao, "pressao", e.target.value)}
              />
              <label>Glicemia (mg/dL)</label>
              <input
                type="text"
                value={sinaisVitais[refeicao]?.glicemia || ""}
                onChange={(e) => handleSinaisVitaisChange(refeicao, "glicemia", e.target.value)}
              />
            </div>

            <div className="campo-medicamentos">
              <label>Adicionar Medicamento</label>
              <div className="campo-adicionar">
                <input
                  type="text"
                  value={sinaisVitais[refeicao]?.novoMedicamento || ""}
                  onChange={(e) => handleSinaisVitaisChange(refeicao, "novoMedicamento", e.target.value)}
                />
                <button onClick={() => adicionarMedicamento(refeicao)}>Adicionar</button>
              </div>
              <div className="lista-medicamentos">
                {sinaisVitais[refeicao]?.medicamentos?.map((medicamento, i) => (
                  <div key={i} className="medicamento">
                    <span>{medicamento.nome}</span>
                    <button onClick={() => removerMedicamento(refeicao, i)}>Remover</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />
      <div className="campo-observacoes">
  <label htmlFor="observacoes">Observações do Dia</label>
  <textarea
    id="observacoes"
    value={observacoes}
    onChange={(e) => setObservacoes(e.target.value)}
    placeholder="Digite suas observações"
  />
</div>


    </div>
      <button className="btn-salvar">Salvar Rotina</button>
      </>
  );
};

export default EvolucaoPaciente;
