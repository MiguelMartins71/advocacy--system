

interface CardProps{
    Id : number,
    descricao: string, // ou uma string real
    caso: string,      // ou uma string real
    image: string,     // ou uma string real
    data: string,        // tipo Date do JavaScript
    hora: string 
    status?: string; // Adicionando status como opcional


}

export function Card({ descricao, caso, image, data, hora }: CardProps) {
    // Supondo que 'data' seja do tipo Date

    return (
        <div className="card">
        <h2 className="card-title">{caso}</h2>
        <p className="card-description">{descricao}</p>
        <img className="card-image" src={image} alt={caso} />
        <p className="card-date">Data: {data}</p>
        <p className="card-time">Hora: {hora}</p>
        
    </div>
    );
}
