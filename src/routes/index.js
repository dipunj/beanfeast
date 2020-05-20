import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.json({ title: 'Express is working' });
});

export default router;
