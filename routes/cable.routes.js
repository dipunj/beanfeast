import { Router } from 'express';
import CableController from '../controllers/cable.controller';

const router = Router();

router.get('/new', CableController.generateNewCable);

export default router;
