import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { addProductDailyController } from '../controllers/daily.js';
import { addProductSchema } from '../validation/daily.js';

const router = Router();

router.use(authenticate);

router.patch(
  '/add-product',
  validateBody(addProductSchema),
  ctrlWrapper(addProductDailyController),
);

export default router;
