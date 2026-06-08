import eventoDAO from '../models/DAO/eventoDAO.js';
import Evento from '../models/Evento.js';

class EventoController
{
    async cadastrar(req, res)
    {
        try
        {
            if (!req.body || Object.keys(req.body).length === 0)
            {
                return res.status(400).json({ erro: "Nenhuma informação foi enviada!" });
            }

            const { nome } = req.body;

            if (!nome)
            {
                return res.status(400).json({ erro: 'O nome do evento é obrigatório.' });
            }

            const novoEvento = new Evento(null, nome);
            const eventoCadastrado = await eventoDAO.cadastrar(novoEvento);
            
            return res.status(201).json(
            {
                mensagem: 'Evento cadastrado com sucesso!',
                evento: eventoCadastrado
            });
        }
        catch (erro)
        {
            console.error('Erro ao cadastrar evento:', erro);
            return res.status(400).json({ erro: erro.message || 'Erro interno no servidor ao cadastrar evento.' });
        }
    }

    async listar(req, res)
    {
        try
        {
            const eventos = await eventoDAO.listarTodos();
            return res.status(200).json(eventos);
        }
        catch (erro)
        {
            console.error('Erro ao listar eventos:', erro);
            return res.status(500).json({ erro: 'Erro interno no servidor ao buscar eventos.' });
        }
    }
}

export default new EventoController();