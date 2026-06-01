import movimentacaoDAO from "../models/DAO/movimentacaoDAO";
import Movimentacao from "../models/Movimentacao";

class MovimentacaoController
{
    /**
     * Método para cadastro de movimentações.
     * 
     * @param {*} req - Requisição do usuário
     * @param {*} res - Resposta devolvida ao usuário
     */
    async cadastrar (req, res)
    {
        try
        {
            const { animalId, eventoId, colocacao, categoria } = req.body;

            const novaMovimentacao = new Movimentacao(null, animalId, eventoId, colocacao, categoria);

            const movimentacaoCriada = await movimentacaoDAO.cadastrar(novaMovimentacao);

            return res.status(201).json({ mensagem: 'Movimentação cadastrada com sucesso!', movimentacao: movimentacaoCriada.toJSON() });
        }
        catch (erro)
        {
            console.error('Erro ao cadastrar movimentação: ', erro);

            return res.status(500).json({ erro: "Erro interno no servidor. Tente novamente mais tarde!"});
        }
    }

    /**
     * Método para listar todas as movimentações feitas no sistema.
     * 
     * @param {*} req - Requisição do usuário
     * @param {*} res - Resposta devolvida ao usuário
     */
    async listar (req, res)
    {
        try
        {
            const historico = await movimentacaoDAO.listarTodos();

            return res.status(200).json({ mensagem: `Dados recuperados com sucesso!`, historico: historico.toJSON() });

        }
        catch (erro)
        {
            console.error('Erro ao listar movimentações: ', erro);

            return res.status(500).json({ erro: "Erro interno no servidor. Tente novamente mais tarde!"});
        }
    }

    /**
     * Método para a atualização de movimentações.
     * 
     * @param {*} req - Requisição do usuário
     * @param {*} res - Resposta devolvida ao usuário
     */
    async atualizar (req, res)
    {
        try
        {
            // ID vem da URL recebendo o dado via parâmetro (ex.: localhost/api/movimentacoes/5, onde 5 é :id no router)
            const { id } = req.params;
    
            const { animalId, eventoId, colocacao, categoria } = req.body;
    
            const movimentacaoAtualizada = new Movimentacao(id, animalId, eventoId, colocacao, categoria);
    
            const movimentacaoResultado = await movimentacaoDAO.atualizar(id, movimentacaoAtualizada);
    
            return res.status(200).json({ mensagem: 'Movimentação atualizada com sucesso!', movimentacao: movimentacaoAtualizada });
        }
        catch (erro)
        {
            console.error('Erro ao atualizar movimentação: ', erro);

            return res.status(500).json({ erro: "Erro interno no servidor. Tente novamente mais tarde!"});
        }
    }

    async excluir (req, res)
    {
        try
        {
            const { id } = req.params;

            const movimentacaoDeletada = await movimentacaoDAO.excluir(id);
        
            if (!movimentacaoDeletada)
            {
                return res.status(404).json({ erro: "Movimentação não encontrada!"});
            }

            return res.status(200).json({ mensagem: "Movimentação excluída com sucesso!"});
        }
        catch (erro)
        {
            console.error('Erro ao excluir movimentação: ', erro);

            return res.status(500).json({ erro: "Erro interno no servidor. Tente novamente mais tarde!"});
        }
    }

}

export default new MovimentacaoController;