import { Router } from 'express';
import authController from '../controllers/authController.js';
import usuarioController from '../controllers/usuarioController.js'; // Importamos o novo controller

import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Rota para CRIAR a conta (Registro)
router.post('/cadastro', (req, res) => usuarioController.cadastrar(req, res));

export default router;