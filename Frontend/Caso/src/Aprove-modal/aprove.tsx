import React from 'react';

interface ApprovalModalProps {
    onApprove: () => void;
    onReject: () => void;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({ onApprove, onReject }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Aprovação do Cadastro</h2>
                <p>Você está prestes a cadastrar um novo caso. Deseja continuar?</p>
                <button onClick={onApprove} style={styles.button}>Aprovar</button>
                <button onClick={onReject} style={{ ...styles.button, ...styles.cancel }}>Rejeitar</button>
            </div>
        </div>
    );
};

// Estilos do modal
const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(230, 249, 230, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        width: '300px',
        textAlign: 'center',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    cancel: {
        backgroundColor: '#f44336',
    },
};

export default ApprovalModal;
