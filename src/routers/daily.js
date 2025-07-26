import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getAllProductController,
  addProductController,
  deleteProductController,
  getPublicCaloriesController,
  privateCaloriesController

} from '../controllers/daily.js';
import {  addProductSchema,getPublicDailySchema,postPrivateDailySchema } from '../validation/daily.js';

const router = Router();

router.get(
  '/public-calories',
  validateBody(getPublicDailySchema),
  ctrlWrapper(getPublicCaloriesController),
);

router.use(authenticate);

router.post(
  '/private-calories',
  validateBody(postPrivateDailySchema),
  ctrlWrapper(privateCaloriesController),
);


router.get(
  '/',

  ctrlWrapper(getAllProductController),
);

router.post(
  '/',
  validateBody(addProductSchema),
  ctrlWrapper(addProductController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteProductController));

export default router;
