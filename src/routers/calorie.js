import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {

  getPublicCaloriesController,
  privateCaloriesController

} from '../controllers/calorie.js';
import {  getPublicDailySchema,postPrivateDailySchema } from '../validation/calorie.js';

const router = Router();

router.get(
  '/public-calories',
  validateBody(getPublicDailySchema),
  ctrlWrapper(getPublicCaloriesController),
);

router.post(
  '/private-calories',
  authenticate,
  validateBody(postPrivateDailySchema),
  ctrlWrapper(privateCaloriesController),
);


export default router;
