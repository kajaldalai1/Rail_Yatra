// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import { userSchema, loginSchema } from '../validations/schemas';

export const register = async (req: Request, res: Response) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id';
  const values = [username, hashedPassword, email];

  try {
    const result = await pool.query(query, values);
    res.status(201).json({ userId: result.rows[0].id });
  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: err });
  }
};
