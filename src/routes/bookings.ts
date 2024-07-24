// src/routes/bookings.ts
import express from 'express';
import { bookTicket } from '../controllers/bookingController';
import { getPincodeWiseBookingsForJuly, getParticularUserBookingsAndVehicleDetails, getStateWiseBookingCounts, getUsersWithOfflinePayments } from '../controllers/bookingController';
import { cancelBooking } from '../controllers/bookingController';

const router = express.Router();

router.post('/', bookTicket);
router.get('/pincode-wise-bookings-july', getPincodeWiseBookingsForJuly);
router.get('/user-bookings/:userId', getParticularUserBookingsAndVehicleDetails);
router.get('/state-wise-bookings', getStateWiseBookingCounts);
router.get('/users-with-offline-payments', getUsersWithOfflinePayments);
router.delete('/cancel-booking/:bookingId', cancelBooking);

export default router;
