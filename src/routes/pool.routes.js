import { Router } from 'express';
import PoolController from '../controllers/pool.controller';

const router = Router();

router.get('/new', PoolController.newPool);
router.get('/update', PoolController.updatePool);

export default router;
