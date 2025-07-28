import express from 'express';
import {
  calculateCaloriesAndProducts,
  searchPublicProducts,
} from '../controllers/public.js';

const router = express.Router();

router.post('/calculate', calculateCaloriesAndProducts);

router.get('/products', searchPublicProducts);

export default router;

