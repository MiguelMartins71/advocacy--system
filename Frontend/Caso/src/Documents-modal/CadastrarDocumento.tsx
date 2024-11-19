import { useState } from "react";

interface CadastrarDocumentosProps {
    onDocumentosCadastrados: () => void;
}

export function CadastrarDocumentos({ onDocumentosCadastrados }: CadastrarDocumentosProps) {
    const [documentos, setDocumentos] = useState<File | null>(null);
    const [imagens, setImagens] = useState<File[]>([]);
    const [link, setLink] = useState<string>("");

    const handleUploadDocumentos = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDocumentos(e.target.files[0]);
        }
    };

    const handleUploadImagens = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImagens(Array.from(e.target.files));
        }
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    };

    const handleAnexarCompilar = () => {
        console.log("Documentos:", documentos);
        console.log("Imagens:", imagens);
        console.log("Link:", link);

        // Simular o cadastro dos documentos
        // Chame a API para salvar os dados aqui
        // Após o sucesso do cadastro, chame o callback
        onDocumentosCadastrados(); // Chama a função para indicar que os documentos foram cadastrados
    };

    const handleCancelar = () => {
        setDocumentos(null);
        setImagens([]);
        setLink("");
    };

    return (
        <div className="modal-body">
            <h2>Cadastrar Todos os Documentos Referentes ao Caso</h2>
            <div className="input-group">
                <label>Documentos (PDF):</label>
                <input type="file" accept=".pdf" onChange={handleUploadDocumentos} />
            </div>
            <div className="input-group">
                <label>Imagens (até 100MB):</label>
                <input type="file" accept="image/*" multiple onChange={handleUploadImagens} />
            </div>
            <div className="input-group">
                <label>Links:</label>
                <input type="text" value={link} onChange={handleLinkChange} />
            </div>
            <div className="button-container">
                <button onClick={handleAnexarCompilar} className="btn-primary">
                    Anexar e Compilar
                </button>
                <button onClick={handleCancelar} className="btn-secondary">
                    Cancelar
                </button>
            </div>
        </div>
    );
}
