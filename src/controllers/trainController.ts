import { Request, Response } from 'express';
import { pool } from '../db';
import { error } from 'console';

export const getTrains = async (req: Request, res: Response) => {
  const query = 'SELECT * FROM trains';
  try {
    const result = await pool.query(query);
    res.json(result.fields);
  } catch (err) {
    console.error('Error fetching trains:', err);
    res.status(500).json({ error: error });
  }
};

export const getTrainDetails = async (req: Request, res: Response) => {
    const { trainId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM trains WHERE train_id = $1', [trainId]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching train details:', err);
        res.status(500).json({ error: err });
    }
};
