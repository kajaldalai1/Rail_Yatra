import { Request, Response } from 'express';
import { pool } from '../db';

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Query to select users
    const result = await pool.query('SELECT id, username, email FROM users');

    // Log result for debugging
    console.log("Fetched users:", result.rows);

    // Send response with users
    res.json(result.fields);
  } catch (err) {
    // Log the error for debugging
    console.error('Error fetching users:', err);

    // Send generic error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
