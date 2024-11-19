import { useState } from "react";

interface AnalisarPendenciasProps {
  onPendenciasConcluidas: (tipoPendencia: string, statusPendencia: string) => void;
}

export const AnalisarPendencias = ({ onPendenciasConcluidas }: AnalisarPendenciasProps) => {
  const [tipoPendencia, setTipoPendencia] = useState<string>("");
  const [statusPendencia, setStatusPendencia] = useState<string>("");
  const [descricaoAcao, setDescricaoAcao] = useState<string>("");
  const [dataAcao, setDataAcao] = useState<string>("");
  const [justificativa, setJustificativa] = useState<string>("");

  const [currentActivity, setCurrentActivity] = useState<number>(1); // Controla qual atividade está visível

  // Função para continuar para a próxima etapa
  const handleContinuar = () => {
    switch (currentActivity) {
      case 1:
        if (tipoPendencia && statusPendencia) {
          setCurrentActivity(2); // Vai para a próxima atividade
        } else {
          alert("Por favor, preencha todos os campos.");
        }
        break;
      case 2:
        if (descricaoAcao && dataAcao) {
          setCurrentActivity(3);
        } else {
          alert("Por favor, preencha todos os campos.");
        }
        break;
      case 3:
        setCurrentActivity(4);
        break;
      case 4:
        if (justificativa) {
          setCurrentActivity(5);
        } else {
          alert("Por favor, preencha a justificativa.");
        }
        break;
      case 5:
        // Chama a função onPendenciasConcluidas ao concluir o processo
        if (descricaoAcao && dataAcao) {
          onPendenciasConcluidas(tipoPendencia, statusPendencia); // Passa os dados necessários para a função de conclusão
          alert("Pendência concluída com sucesso!");
        } else {
          alert("Por favor, preencha todos os campos antes de concluir.");
        }
        break;
      default:
        break;
    }
  };

  // Função para cancelar o processo e voltar para a tela inicial do site
  const handleCancelar = () => {
    alert("Processo cancelado.");
    window.location.href = "/"; // Redireciona para a página inicial
  };

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        {currentActivity === 1 && (
          <>
            <h2 className="modal-title">Analisar Pendências</h2>
            <form>
              <div className="input-group">
                <label htmlFor="tipoPendencia">Tipo de Pendência:</label>
                <select
                  id="tipoPendencia"
                  value={tipoPendencia}
                  onChange={(e) => setTipoPendencia(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="documentos">Documentos</option>
                  <option value="reunioes">Reuniões</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="statusPendencia">Status da Pendência:</label>
                <select
                  id="statusPendencia"
                  value={statusPendencia}
                  onChange={(e) => setStatusPendencia(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="pendente">Pendente</option>
                  <option value="resolvido">Resolvido</option>
                </select>
              </div>

              <div className="buttons">
                <button type="button" onClick={handleContinuar} className="btn-primary">
                  Continuar
                </button>
                <button type="button" onClick={handleCancelar} className="btn-danger">
                  Cancelar
                </button>
              </div>
            </form>
          </>
        )}

        {currentActivity === 2 && (
          <section id="atividade2">
            <h2>2. Realizar Ação Necessária</h2>
            <form id="formAcao">
              <div className="input-group">
                <label htmlFor="descricaoAcao">Descrição da Ação:</label>
                <textarea
                  id="descricaoAcao"
                  name="descricaoAcao"
                  placeholder="Descreva a ação necessária..."
                  value={descricaoAcao}
                  onChange={(e) => setDescricaoAcao(e.target.value)}
                  maxLength={500}
                  rows={4}
                ></textarea>
              </div>

              <div className="input-group">
                <label htmlFor="dataAcao">Data da Ação:</label>
                <input
                  type="datetime-local"
                  id="dataAcao"
                  name="dataAcao"
                  value={dataAcao}
                  onChange={(e) => setDataAcao(e.target.value)}
                  required
                />
              </div>

              <div className="buttons">
                <button type="button" onClick={handleContinuar} className="btn-primary">
                  Continuar
                </button>
                <button type="button" onClick={handleCancelar} className="btn-danger">
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        {currentActivity === 3 && (
          <section id="atividade3">
            <h2>3. Mobilização de Pessoal</h2>
            <form id="formMobilizacao">
              <div className="input-group">
                <label htmlFor="pessoalMobilizado">Pessoal Mobilizado:</label>
                <select id="pessoalMobilizado" name="pessoalMobilizado">
                  <option value="nome1">Nome 1</option>
                  <option value="nome2">Nome 2</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="statusMobilizacao">Status da Mobilização:</label>
                <select id="statusMobilizacao" name="statusMobilizacao">
                  <option value="concluido">Concluído</option>
                  <option value="naoConcluido">Não Concluído</option>
                </select>
              </div>

              <div className="buttons">
                <button type="button" onClick={handleContinuar} className="btn-primary">
                  Continuar
                </button>
                <button type="button" onClick={handleCancelar} className="btn-danger">
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        {currentActivity === 4 && (
          <section id="atividade4">
            <h2>4. Solicitar Aumento de Prazo</h2>
            <form id="formSolicitacao">
              <div className="input-group">
                <label htmlFor="justificativa">Justificativa:</label>
                <textarea
                  id="justificativa"
                  name="justificativa"
                  placeholder="Informe a justificativa..."
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                  required
                  rows={4}
                ></textarea>
              </div>

              <div className="buttons">
                <button type="button" onClick={handleContinuar} className="btn-primary">
                  Enviar Solicitação
                </button>
                <button type="button" onClick={handleCancelar} className="btn-danger">
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        {currentActivity === 5 && (
          <section id="atividade5">
            <h2>5. Concluir Ação Necessária</h2>
            <form id="formAcao4">
              <div className="input-group">
                <label htmlFor="descricaoAcao4">Descrição da Ação:</label>
                <textarea
                  id="descricaoAcao4"
                  name="descricaoAcao4"
                  placeholder="Descreva a ação necessária..."
                  value={descricaoAcao}
                  onChange={(e) => setDescricaoAcao(e.target.value)}
                  maxLength={500}
                  rows={4}
                ></textarea>
              </div>

              <div className="input-group">
                <label htmlFor="dataAcao4">Data da Ação:</label>
                <input
                  type="datetime-local"
                  id="dataAcao4"
                  name="dataAcao4"
                  value={dataAcao}
                  onChange={(e) => setDataAcao(e.target.value)}
                  required
                />
              </div>

              <div className="buttons">
                <button type="button" onClick={handleContinuar} className="btn-primary">
                  Concluir Ação Concluída
                </button>
                <button type="button" onClick={handleCancelar} className="btn-danger">
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};
