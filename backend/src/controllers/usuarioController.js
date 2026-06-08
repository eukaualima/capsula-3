import usuarioDAO from '../models/DAO/usuarioDAO.js';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

class UsuarioController
{
    async cadastrar(req, res)
    {
        try
        {
            if (!req.body || Object.keys(req.body).length === 0)
            {
                return res.status(400).json({ erro: "Nenhuma informação foi enviada!" });
            }

            const { nome, email, senha, perfil } = req.body;

            if (!nome || !email || !senha)
            {
                return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios.' });
            }

            // Regra de Negócio: Impedir que alguém se cadastre como Admin por conta própria
            // Se a rota for pública, forçamos o perfil para 'usuario'
            const perfilDefinido = perfil === 'admin' ? 'usuario' : 'usuario'; 

            const usuarioExistente = await usuarioDAO.buscarPorEmail(email);

            if (usuarioExistente)
            {
                return res.status(409).json({ erro: 'Este e-mail já está em uso.' }); // 409 = Conflict
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const novoUsuario = new Usuario(null, nome, email, senhaCriptografada, perfilDefinido);
            
            const usuarioCadastrado = await usuarioDAO.cadastrar(novoUsuario);
            
            return res.status(201).json(
            {
                mensagem: 'Usuário cadastrado com sucesso!',
                usuario: usuarioCadastrado 
            });
        }
        catch (erro)
        {
            console.error('Erro ao cadastrar usuário:', erro);

            return res.status(400).json({ erro: erro.message || 'Erro interno ao cadastrar usuário.' });
        }
    }
}

export default new UsuarioController();