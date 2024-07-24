import express from 'express';
const router =express.Router();
import { getPassengerDetailsByBookingId } from '../controllers/passengersController';

router.get('/passengers/:bookingId', getPassengerDetailsByBookingId);


export default router;
