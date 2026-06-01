import db from '../../config/database.js';
import Animal from '../Animal.js';

class AnimalDAO
{
    async cadastrar(animalObj)
    {
        const sql = `
            INSERT INTO animais (nome, registro, datanasc) 
            VALUES (?, ?, ?);
        `;
        
        const valores = [animalObj.nome, animalObj.registro, animalObj.dataNasc];
        
        const [resultado] = await db.query(sql, valores);
        
        return new Animal(resultado.insertId, animalObj.nome, animalObj.registro, animalObj.dataNasc);
    }

    async listarTodos()
    {
        const sql = 'SELECT * FROM animais ORDER BY nome ASC;';
        
        // desestruturamos para pegar apenas as linhas (rows)
        const [linhas] = await db.query(sql);
        
        // transformamos as linhas do banco em instâncias da nossa classe
        return linhas.map(linha => new Animal(linha.id, linha.nome, linha.registro, linha.datanasc));
    }
}

export default new AnimalDAO();