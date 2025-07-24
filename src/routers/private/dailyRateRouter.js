
import express from 'express';
import { calculateDailyRate } from '../../controllers/private/dailyRateController.js';


const router = express.Router();

router.post('/calculate', calculateDailyRate);

export default router;
