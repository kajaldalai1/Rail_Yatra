import { Request, Response } from "express";
import { pool} from '../db';

export const getPassengerDetailsByBookingId = async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM passengers WHERE user_id IN (SELECT user_id FROM bookings WHERE id = $1)', [bookingId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching passenger details:', err);
        res.status(500).json({ error: err });
    }
};