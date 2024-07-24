import express from 'express';
import { getAvailableSeatsForTrain } from '../controllers/classesController';
const router = express.Router();


router.get('/:trainId/classes/:classId/available-seats', getAvailableSeatsForTrain);

export default router;
