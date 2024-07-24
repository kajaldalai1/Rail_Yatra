import express from 'express';
const router = express.Router();
import { getAllStations } from '../controllers/stationController';


router.get('/stations', getAllStations);
export default router;