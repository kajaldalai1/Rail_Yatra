import express from 'express';
import { getCoachesForTrain} from '../controllers/coachesController';

const router = express.Router();

router.get('/:trainId/coaches', getCoachesForTrain);

export default router;
