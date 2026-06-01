import { Router } from 'express';

import animalController from '../controllers/animalController.js';
import eventoController from '../controllers/eventoController.js';

import { verificarToken, verificarAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Animais
router.post('/animais', verificarToken, verificarAdmin, (req, res) => animalController.cadastrar(req, res));
router.get('/animais', (req, res) => animalController.listar(req, res)); 

// Eventos
router.post('/eventos', verificarToken, verificarAdmin, (req, res) => eventoController.cadastrar(req, res));
router.get('/eventos', (req, res) => eventoController.listar(req, res)); 

export default router;