import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addProductDailyController,
  deleteProductDailyController,
  getDailyByDateController,
} from '../controllers/daily.js';
import {
  addProductSchema,
  deleteProductSchema,
  getDailyByDateSchema,
} from '../validation/daily.js';

const router = Router();

router.use(authenticate);
router.get(
  '/',
  validateBody(getDailyByDateSchema),
  ctrlWrapper(getDailyByDateController),
);
router.patch(
  '/add-product',
  validateBody(addProductSchema),
  ctrlWrapper(addProductDailyController),
);

router.patch(
  '/delete-product',
  validateBody(deleteProductSchema),
  ctrlWrapper(deleteProductDailyController),
);

export default router;
