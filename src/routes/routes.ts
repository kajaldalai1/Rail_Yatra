import express from 'express';
const router = express.Router();
import { getRoutesForTrain } from '../controllers/routesController';

router.get('/routes/:trainId', getRoutesForTrain);


export default router;
