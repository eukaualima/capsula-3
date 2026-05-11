import db from '../config/database.js';
import Movimentacao from './Movimentacao.js';

class MovimentacaoDAO
{
    async cadastrar(movimentacaoObj)
    {
        const sql = `
            INSERT INTO movimentacoes (animal_id, evento_id, colocacao, categoria) 
            VALUES (?, ?, ?, ?);
        `;
        
        const valores = [
            movimentacaoObj.animalId, 
            movimentacaoObj.eventoId, 
            movimentacaoObj.colocacao, 
            movimentacaoObj.categoria
        ];
        
        const [resultado] = await db.query(sql, valores);
        
        return new Movimentacao(
            resultado.insertId, 
            movimentacaoObj.animalId, 
            movimentacaoObj.eventoId, 
            movimentacaoObj.colocacao, 
            movimentacaoObj.categoria
        );
    }

    async listarTodos()
    {
        const sql = `
            SELECT 
                m.id, m.colocacao, m.categoria, 
                a.nome AS animal_nome, 
                e.nome AS evento_nome
            FROM movimentacoes m
            INNER JOIN animais a ON m.animal_id = a.id
            INNER JOIN eventos e ON m.evento_id = e.id
            ORDER BY m.id DESC;
        `;
        
        const [linhas] = await db.query(sql);
        
        return linhas;
    }

    async atualizar(id, movimentacaoObj)
    {
        const sql = `
            UPDATE movimentacoes 
            SET animal_id = ?, evento_id = ?, colocacao = ?, categoria = ?
            WHERE id = ?;
        `;
        
        const valores = [
            movimentacaoObj.animalId, 
            movimentacaoObj.eventoId, 
            movimentacaoObj.colocacao, 
            movimentacaoObj.categoria,
            id
        ];
        
        const [resultado] = await db.query(sql, valores);
        
        // se nenhuma linha foi afetada, significa que o ID não existe
        if (resultado.affectedRows === 0) {
            return null; 
        }

        return movimentacaoObj;
    }

    async excluir(id)
    {
        const sql = 'DELETE FROM movimentacoes WHERE id = ?;';
        const [resultado] = await db.query(sql, [id]);
        
        // retorna true se deletou algo, ou false se o ID não existia
        return resultado.affectedRows > 0;
    }
}

export default new MovimentacaoDAO();