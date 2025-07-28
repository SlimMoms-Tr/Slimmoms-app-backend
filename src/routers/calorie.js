import { getDailyCaloriesPrivate } from '../controllers/private.js';
import authenticate from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { privateSchema } from '../validation/index.js';
import { calculateCaloriesAndProducts } from '../controllers/public.js';
import { Router } from 'express';
import { dailyCollection } from '../db/models/daily.js';

const router = Router();

router.post(
  '/daily-calories',
  authenticate,
  validateBody(privateSchema),
  getDailyCaloriesPrivate,
);
router.get('/daily-rate', calculateCaloriesAndProducts);
export default router;


