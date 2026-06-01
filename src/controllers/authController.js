import usuarioDAO from "../models/DAO/usuarioDAO";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthController
{
    async login (req, res)
    {
        try
        {
            const { email, senha } = req.body;

            if (!email || !senha)
            {
                return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
            }

            const usuario = await usuarioDAO.buscarPorEmail(email);

            if (!usuario)
            {
                return res.status(401).json({ erro: "E-mail ou senha inválido." });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaValida)
            {
                return res.status(401).json({ erro: "E-mail ou senha inválido." });
            }

            const secret = process.env.JWT_SECRET || 'a_chave_super_secreta';

            const payload = {
                id: usuario.id,
                perfil: usuario.perfil,
                email: usuario.email
            }

            const token = jwt.sign(payload, secret, { expiresIn: '8h' });

            return res.status(200).json({ mensagem: "Login efetuado com sucesso!", token: token, usuario: usuario.toJSON() });
        }
        catch (erro)
        {
            return res.status(500).json({ erro: 'Erro interno no servidor.' });
        }
    }
}