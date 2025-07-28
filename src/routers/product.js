import express from 'express';
import { searchProducts } from '../controllers/product.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/products', ctrlWrapper(searchProducts));

export default router;

