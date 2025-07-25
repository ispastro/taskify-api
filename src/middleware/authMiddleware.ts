/// <reference path="../types/express.d.ts" />

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    const error = new Error('Authentication required: No token provided');
    console.error(`[${new Date().toISOString()}] ${error.message}`);
    return res.status(401).json({ error: error.message });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      const error = new Error('User not found: Invalid user ID');
      console.error(`[${new Date().toISOString()}] ${error.message}`);
      return res.status(401).json({ error: error.message });
    }

    req.user = user;
    next();
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Invalid token');
    console.error(`[${new Date().toISOString()}] Authentication error: ${err.message}`, err.stack);
    res.status(401).json({ error: 'Invalid token', details: err.message });
  }
};