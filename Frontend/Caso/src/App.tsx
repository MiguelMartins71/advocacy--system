import { useState } from 'react';
import './App.css';
import './components/card/card.css';
import { Card } from './components/card/card';
import { useCasoData } from './hooks/useCasoData';
import { CreateModal } from './components/create-modal/create-modal';
import { CasoData } from './interface/CasoData';
import { AnalisarPendencias } from './components/create-modal/AnalisaPendencias'; // Importando a tela de análise de pendências
import jsPDF from 'jspdf';

function App() {
  const { data = [] }: { data?: CasoData[] } = useCasoData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    numeroProcesso: "",
    dataCriacao: ""
  });
  const [filteredData, setFilteredData] = useState<CasoData[]>([]);
  const [selectedDocumento, setSelectedDocumento] = useState<CasoData | null>(null);
  const [isPendenciasModalOpen, setIsPendenciasModalOpen] = useState(false); // Estado para exibir modal de pendências

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const results = data.filter((casoData) => {
      return (
        (searchParams.numeroProcesso === "" || casoData.caso.includes(searchParams.numeroProcesso)) &&
        (searchParams.dataCriacao === "" || casoData.data === searchParams.dataCriacao)
      );
    });

    setFilteredData(results);
    if (results.length === 0) {
      alert("Nenhum documento encontrado.");
    }
  };

  const handleSelectDocumento = (documento: CasoData) => {
    setSelectedDocumento(documento);
  };

  const handleFinalizar = () => {
    setSelectedDocumento(null);
    setFilteredData([]);
  };

  const handleVisualizarDocumento = () => {
    if (selectedDocumento) {
      const doc = new jsPDF();
      const img = new Image();

      img.src = selectedDocumento.image;

      img.onload = () => {
        doc.addImage(img, 'JPEG', 10, 10, 180, 100); // Adiciona a imagem

        // Centraliza o texto
        const centerX = doc.internal.pageSize.getWidth() / 2;

        // Configurações de fonte
        doc.setFontSize(20);
        doc.text("Documento Jurídico", centerX, 130, { align: 'center' }); // Título centralizado

        // Adiciona descrição
        doc.setFontSize(16);
        doc.text("Descrição:", centerX, 160, { align: 'center' });
        doc.setFontSize(12);
        doc.text(selectedDocumento.descricao, centerX, 170, { align: 'center' });

        // Adiciona caso
        doc.setFontSize(16);
        doc.text("Caso:", centerX, 200, { align: 'center' });
        doc.setFontSize(12);
        doc.text(selectedDocumento.caso, centerX, 210, { align: 'center' });

        // Adiciona data
        doc.setFontSize(16);
        doc.text("Data:", centerX, 240, { align: 'center' });
        doc.setFontSize(12);
        doc.text(selectedDocumento.data, centerX, 250, { align: 'center' });

        // Adiciona hora
        doc.setFontSize(16);
        doc.text("Hora:", centerX, 280, { align: 'center' });
        doc.setFontSize(12);
        doc.text(selectedDocumento.hora, centerX, 290, { align: 'center' });

        // Prazos e Pendências
        doc.setFontSize(16);
        doc.text("Tipo de Pendência:", centerX, 320, { align: 'center' });
        doc.setFontSize(12);
        doc.text(selectedDocumento.tipoPendencia || 'Nenhuma', centerX, 330, { align: 'center' });

        doc.setFontSize(16);
        doc.text("Status da Pendência:", centerX, 360, { align: 'center' });
        doc.setFontSize(12);
        doc.text(selectedDocumento.statusPendencia || 'Não Resolvido', centerX, 370, { align: 'center' });

        // Salva o PDF
        doc.save(`${selectedDocumento.caso}.pdf`);
      };

      img.onerror = () => {
        console.error("Erro ao carregar a imagem:", selectedDocumento.image);
        alert("Erro ao carregar a imagem. Verifique se a URL está correta.");
      };
    }
  };

  // Função para abrir o modal de pendências
  const handleOpenPendenciasModal = () => {
    setIsPendenciasModalOpen(true);
  };

  // Função para fechar o modal de pendências
  const handleClosePendenciasModal = () => {
    setIsPendenciasModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Sistema de Gestão de Casos Jurídicos</h1>

      <div className="search-container">
        <input
          type="text"
          name="numeroProcesso"
          placeholder="Número do Processo"
          value={searchParams.numeroProcesso}
          onChange={handleSearchChange}
        />
        <input
          type="date"
          name="dataCriacao"
          placeholder="Data de Criação"
          value={searchParams.dataCriacao}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleFinalizar}>Cancelar</button>
      </div>

      {filteredData.length > 0 && !selectedDocumento && (
        <div className="results-container">
          <h2>Resultados da Busca</h2>
          <ul>
            {filteredData.map((casoData) => (
              <li key={casoData.Id} onClick={() => handleSelectDocumento(casoData)}>
                <strong>{casoData.caso}</strong> - {casoData.data}
                <div>Status da Pendência: {casoData.statusPendencia}</div>
              </li>
            ))}
          </ul>

          {/* Botão para analisar pendências */}
          <button onClick={handleOpenPendenciasModal} className="btn-pendencias">
            Analisar Pendências
          </button>
        </div>
      )}

      {selectedDocumento && (
        <div className="document-container">
          <h2>Documento Selecionado</h2>
          <Card
            caso={selectedDocumento.caso}
            data={selectedDocumento.data}
            hora={selectedDocumento.hora}
            image={selectedDocumento.image}
            descricao={selectedDocumento.descricao}
            Id={0}
          />
          <button onClick={handleFinalizar}>Finalizar</button>
          <button onClick={() => setSelectedDocumento(null)}>Nova Busca</button>
          <button onClick={handleVisualizarDocumento}>Visualizar Documento</button>
        </div>
      )}

      {isModalOpen && <CreateModal />}

      {isPendenciasModalOpen && <AnalisarPendencias onClose={handleClosePendenciasModal} />}

      <div className="button-container">
        <button onClick={handleOpenModal}>Novo</button>
      </div>
    </div>
  );
}

export default App;
