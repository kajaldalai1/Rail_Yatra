import { Request, Response } from "express";
import { pool } from '../db';





export const getAvailableSeatsForTrain = async (req: Request, res: Response) => {
    const { trainId, classId } = req.params;
    try {
        const query = `
            SELECT total_seats - (
                SELECT COUNT(*)
                FROM tickets
                WHERE class_id = $1 AND train_id = $2
            ) AS available_seats
            FROM classes
            WHERE id = $1
        `;
        const result = await pool.query(query, [classId, trainId]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching available seats:', err);
        res.status(500).json({ error: err });
    }
};
