import express from 'express';
import { createClient, getClientsByUser, updateClientStatus } from '../controllers/client.controller.js';
import { authenticateUser, verifyToken } from '../middleware/verifyToken.js';



const router = express.Router();

router.get('/clients/:id', getClientsByUser);
router.put('/clients/status', updateClientStatus);
router.post('/clients/create', createClient);


export default router;