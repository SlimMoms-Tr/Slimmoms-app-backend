import express from 'express';
import { getDailyCaloriesPrivate } from '../controllers/private.js';
import authenticate from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { privateSchema } from '../validation/index.js';
import { calculateCaloriesAndProducts } from '../controllers/public.js';
const router = express.Router();

router.post('/daily-calories', authenticate, validateBody(privateSchema), getDailyCaloriesPrivate);
router.get('/daily-rate', calculateCaloriesAndProducts);
export default router;
