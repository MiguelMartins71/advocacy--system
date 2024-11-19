import { useState } from "react";
import { useCasoDataMutate } from "../hooks/useCasoDataMutate"; // Ajuste a importação conforme necessário
import ApprovalModal from "../Aprove-modal/aprove"; // Modal de aprovação, se necessário

interface ValidarCasoCompiladoProps {
    casoId: number;
}

export function ValidarCasoCompilado({ casoId }: ValidarCasoCompiladoProps) {
    const { mutate } = useCasoDataMutate(); // Hook para mutação
    const [isApprovalModalOpen, setApprovalModalOpen] = useState(false); // Estado para o modal de aprovação
    const [isApproved, setIsApproved] = useState(false); // Estado para saber se foi aprovado

    const handleAprovar = () => {
        if (casoId) {
            mutate({
                Id: casoId, status: "aprovado",
                caso: "",
                data: "",
                hora: "",
                image: "",
                descricao: ""
            });
            setIsApproved(true);
            setApprovalModalOpen(false);
        }
    };

    const handleRejeitar = () => {
        if (casoId) {
            mutate({
                Id: casoId, status: "rejeitado",
                caso: "",
                data: "",
                hora: "",
                image: "",
                descricao: ""
            });
            setApprovalModalOpen(false);
        }
    };

    const handlePostar = (e: React.FormEvent) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setApprovalModalOpen(true); // Abre o modal de aprovação
    };

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2 className="modal-title">Validar Caso Compilado</h2>
                <form className="input-container" onSubmit={handlePostar}>
                    <div className="input-group">
                        <label>ID do Caso:</label>
                        <input
                            type="number"
                            value={casoId || ""}
                            readOnly
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn-secondary">
                            Validar
                        </button>
                    </div>
                </form>
                {isApprovalModalOpen && (
                    <ApprovalModal onApprove={handleAprovar} onReject={handleRejeitar} />
                )}
                {isApproved && <p>Caso aprovado com sucesso!</p>}
            </div>
        </div>
    );
}
