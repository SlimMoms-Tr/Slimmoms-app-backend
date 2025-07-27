import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { addProductDailyController,deleteProductDailyController} from '../controllers/daily.js';
import { addProductSchema,deleteProductSchema } from '../validation/daily.js';

const router = Router();

router.use(authenticate);

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
