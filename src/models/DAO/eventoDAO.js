import db from '../../config/database.js';
import Evento from '../Evento.js';

class EventoDAO
{
    async cadastrar(eventoObj)
    {
        const sql = `
            INSERT INTO eventos (nome) 
            VALUES (?);
        `;
        
        const [resultado] = await db.query(sql, [eventoObj.nome]);
        
        return new Evento(resultado.insertId, eventoObj.nome);
    }

    async listarTodos()
    {
        const sql = 'SELECT * FROM eventos ORDER BY nome ASC;';
        
        const [linhas] = await db.query(sql);
        
        return linhas.map(linha => new Evento(linha.id, linha.nome));
    }
}

export default new EventoDAO();