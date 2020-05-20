import { Router } from 'express';
import CableController from '../controllers/cable.controller';

const router = Router();

router.post('/new', CableController.newCable);
router.post('/update', CableController.updateCable);

export default router;
