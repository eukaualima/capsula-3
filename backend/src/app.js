import express from 'express';
import cors from 'cors';

// Importação das rotas da API
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import movimentacaoRoutes from './routes/movimentacaoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

/**
 * Função para a configuração de Middlewares globais do sistema.
 */
function configurarMiddlewaresGlobais()
{
    app.use(cors());
    app.use(express.json());
}

/**
 * Função para a configuração das rotas da API.
 */
function configurarRotas()
{
    app.use('/api', authRoutes);

    app.use('/api/admin', adminRoutes);

    app.use('/api/usuario', usuarioRoutes);

    app.use('/api/movimentacoes', movimentacaoRoutes);

    app.use('/health', (req, res) => 
    {
        return res.status(200).json({ status: "OK!" });
    });
}

configurarMiddlewaresGlobais();
configurarRotas();

export default app;