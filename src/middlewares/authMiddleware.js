import jwt from 'jsonwebtoken';

export function verificarToken (req, res, next)
{
    const authCabecalho = req.headers['authorization'];

    // padrão: "Bearer AhjgUgfjhaI..."
    const token = authCabecalho && authCabecalho.split(' ')[1];
    
    if (!token)
    {
        return res.status(401).json({ erro: "Acesso negado. Token não fornecido." });
    }

    try
    {
        const secret = process.env.JWT_SECRET || 'a_chave_super_secreta';

        const payloadDecodificado = jwt.verify(token, secret);

        req.usuarioLogado = payloadDecodificado;

        next();
    }
    catch (erro)
    {
        return res.status(403).json({ erro: "Token inválido ou expirado." });
    }
}

// verifica se, além de logado, o usuário é um Admin
export function verificarAdmin(req, res, next) 
{
    // como esse middleware rodará DEPOIS do verificarToken, o req.usuarioLogado já existe
    if (!req.usuarioLogado || req.usuarioLogado.perfil !== 'admin') 
    {
        return res.status(403).json({ erro: 'Acesso negado. Requer privilégios de administrador.' });
    }
    
    next();
}