import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getAllProductController,
  postProductController,
  searchProductsController,
} from '../controllers/product.js';
import {
  postProductSchema,
  searchProductsSchema,
} from '../validation/product.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getAllProductController));
router.get('/search', ctrlWrapper(searchProductsController));
router.post(
  '/',
  validateBody(postProductSchema),
  ctrlWrapper(postProductController),
);

export default router;
