import {Router} from 'express';
import linksController from '../controllers/links';
const router = Router();

router.post('/links', linksController.postlink);

router.get('/links/:code', linksController.hitlink);

router.get('/links/:code/stats', linksController.getlink);

export default router;
