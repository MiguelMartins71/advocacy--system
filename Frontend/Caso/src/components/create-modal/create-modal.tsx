import { useState } from "react";
import { useCasoDataMutate } from "../../hooks/useCasoDataMutate";
import { CasoData } from "../../interface/CasoData";
import ApprovalModal from "../../Aprove-modal/aprove"; // Importando a tela de aprovação
import { AnalisarPendencias } from "./AnalisaPendencias";


interface InputProps {
    label: string,
    value: string | number,
    updateValue: (value: any) => void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)} />
        </>
    );
}


export function CreateModal() {
    const [descricao, setDescricao] = useState<string>("");
    const [caso, setCaso] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [hora, setHora] = useState<string>("");
    const { mutate } = useCasoDataMutate();
    const [isApprovalModalOpen, setApprovalModalOpen] = useState(false);
    const [isFormOpen, setFormOpen] = useState(true); 

    const handlePostar = (e: React.FormEvent) => {
        e.preventDefault(); 
        setApprovalModalOpen(true); 
    };

    const handleApproval = () => {
        const casoData: CasoData = {
            descricao,
            caso,
            image,
            data,
            hora,
            tipoPendencia: "",
            statusPendencia: "",
            descricaoAcao: "",
            dataAcao: "",
            statusPrazo: ""
        };

        mutate(casoData); 
        setApprovalModalOpen(false); 
        setFormOpen(false); 
    };

    const handleRejection = () => {
        setApprovalModalOpen(false); 
    };

    const handleCancel = () => {
        setFormOpen(false); 
    };

    return (
        <>
            {isFormOpen && (
                <div className="modal-overlay">
                    <div className="modal-body">
                        <h2 className="modal-title">Cadastre um Novo Caso Jurídico</h2>
                        <form className="input-container" onSubmit={handlePostar}>
                            <div className="input-group">
                                <Input label="Descrição" value={descricao} updateValue={setDescricao} />
                            </div>
                            <div className="input-group">
                                <Input label="Caso" value={caso} updateValue={setCaso} />
                            </div>
                            <div className="input-group">
                                <Input label="Imagem" value={image} updateValue={setImage} />
                            </div>
                            <div className="input-group">
                                <Input label="Data" value={data} updateValue={setData} />
                            </div>
                            <div className="input-group">
                                <Input label="Hora" value={hora} updateValue={setHora} />
                            </div>

                            <div className="button-container">
                                <button type="submit" className="btn-secondary">
                                    Postar
                                </button>
                                <button type="button" className="btn-cancel" onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                        {isApprovalModalOpen && (
                            <ApprovalModal onApprove={handleApproval} onReject={handleRejection} />
                        )}
                    </div>
                </div>
            )}
        </>
    )};