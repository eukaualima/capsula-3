import { Router } from 'express';
import movimentacaoController from '../controllers/movimentacaoController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', verificarToken, (req, res) => 
{
    return movimentacaoController.cadastrar(req, res);
});

router.get('/', verificarToken, (req, res) => 
{
    return movimentacaoController.listar(req, res);
});

router.put('/:id', verificarToken, (req, res) => 
{
    return movimentacaoController.atualizar(req, res);
});

router.delete('/:id', verificarToken, (req, res) => 
{
    return movimentacaoController.excluir(req, res);
});

export default router;