import { Request, Response } from "express";
import { pool } from '../db';
import { error } from 'console';



export const getCoachesForTrain = async (req: Request, res: Response) => {
    const { trainId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM coaches WHERE train_id = $1', [trainId]);
        res.json(result.fields);
        console.log('coaches', result);
    } catch (err) {
        console.error('Error fetching coaches:', err);
        res.status(500).json({ error: err });
    }
};

