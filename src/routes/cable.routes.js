import { Router } from 'express';
import CableController from '../controllers/cable.controller';

const router = Router();

router.get('/new', CableController.newCable);
router.get('/update', CableController.updateCable);

export default router;
