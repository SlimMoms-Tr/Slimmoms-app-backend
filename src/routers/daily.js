import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getAllProductController,
  addProductController,
  deleteProductController,
} from '../controllers/daily.js';
import { getDailySchema, addProductSchema } from '../validation/daily.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  validateBody(getDailySchema),
  ctrlWrapper(getAllProductController),
);

router.post(
  '/',
  validateBody(addProductSchema),
  ctrlWrapper(addProductController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteProductController));

export default router;
