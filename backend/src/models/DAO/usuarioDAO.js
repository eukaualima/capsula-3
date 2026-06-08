import db from '../../config/database.js';
import Usuario from '../Usuario.js';

class UsuarioDAO
{
    async buscarPorEmail(email)
    {
        const sql = 'SELECT * FROM usuarios WHERE email = ?;';
        const [linhas] = await db.query(sql, [email]);
        
        if (linhas.length === 0) return null;
        
        const linha = linhas[0];
        return new Usuario(linha.id, linha.nome, linha.email, linha.senha, linha.perfil);
    }

    async cadastrar(usuarioObj)
    {
        const sql = `
            INSERT INTO usuarios (nome, email, senha, perfil) 
            VALUES (?, ?, ?, ?);
        `;
        const valores = [usuarioObj.getNome(), usuarioObj.getEmail(), usuarioObj.getSenha(), usuarioObj.getPerfil()];
        const [resultado] = await db.query(sql, valores);
        
        return new Usuario(resultado.insertId, usuarioObj.getNome(), usuarioObj.getEmail(), usuarioObj.getSenha(), usuarioObj.getPerfil());
    }
}

export default new UsuarioDAO();