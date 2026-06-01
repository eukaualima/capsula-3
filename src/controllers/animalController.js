import animalDAO from "../models/DAO/animalDAO.js";
import Animal from "../models/Animal.js";

class AnimalController
{
    /**
     * Método para cadastro de animais.
     * 
     * @param {*} req - Requisição do usuário
     * @param {*} res - Resposta devolvida ao usuário
     */
    async cadastrar (req, res)
    {
        try
        {
            const { nome, registro, dataNasc } = req.body;

            if (!nome || !registro || !dataNasc)
            {
                return res.status(400).json({ erro: "Nome, registro e data de nascimento são obrigatórios!" });
            }

            const novoAnimal = new Animal(null, nome, registro, dataNasc);

            const animalCadastrado = await animalDAO.cadastrar(novoAnimal);

            return res.status(201).json({ mensagem: 'Animal cadastrado com sucesso!', animal: animalCadastrado.toJSON() });
        }
        catch (erro)
        {
            console.error('Erro interno no servidor ao cadastrar o animal: ', erro);

            return res.status(500).json({ erro: 'Erro interno no servidor. Tente novamente mais tarde.' });
        }
    }

    /**
     * Método para listar todos os animais do sistema.
     * 
     * @param {*} req - Requisição do usuário
     * @param {*} res - Resposta devolvida ao usuário
     */
    async listar (req, res)
    {
        try
        {
            const animais = await animalDAO.listarTodos();

            return res.status(200).json(animais);
        }
        catch (erro)
        {
            console.error('Erro ao cadastrar animal: ', erro);

            return res.status(500).json({ erro: 'Erro interno no servidor. Tente novamente mais tarde.' })
        }
    }
}

export default new Animal;