import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  postPublicCaloriesController,
  privateCaloriesController,
  getUserCaloriesController,
} from '../controllers/calorie.js';
import {
  postPublicDailySchema,
  postPrivateDailySchema,
} from '../validation/calorie.js';

const router = Router();

router.post(
  '/public-calories',
  validateBody(postPublicDailySchema),
  ctrlWrapper(postPublicCaloriesController),
);

router.post(
  '/private-calories',
  authenticate,
  validateBody(postPrivateDailySchema),
  ctrlWrapper(privateCaloriesController),
);

router.get(
  '/user-calories',
  authenticate,
  ctrlWrapper(getUserCaloriesController),
);

export default router;
