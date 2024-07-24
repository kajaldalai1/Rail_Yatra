// src/routes/trains.ts
import express from 'express';
import { getTrains } from '../controllers/trainController';
import { getTrainDetails } from '../controllers/trainController';
const router = express.Router();

router.get('/', getTrains);
router.get('/trains/:trainId', getTrainDetails);


export default router;
