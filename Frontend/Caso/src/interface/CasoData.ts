
export interface CasoData {
        Id?: number;

   
        caso: string;
        data: string;       // Ou string, dependendo de como você está armazenando
        hora: string;     // Se for uma string, ou pode ser Date também
        image: string;
        descricao: string;
        status?: string; // Adicionando status como opcional
        tipoPendencia: string;
        statusPendencia: string;
        descricaoAcao: string;
        dataAcao: string;
        statusPrazo: string;
    

}


