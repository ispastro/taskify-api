/// <reference path="../types/express.d.ts" />

import { Request, Response } from 'express';
import prisma from '../config/database';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Task name is required' });
    }
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const task = await prisma.task.create({
      data: {
        name,
        status: 'pending',
        userId: req.user.id,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const { page = '1', limit = '10', search = '' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      userId: req.user.id,
      ...(search && { name: { contains: String(search), mode: 'insensitive' } }),
    };

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ]);

    res.json({
      tasks,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Use "pending" or "completed"' });
    }

    const task = await prisma.task.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const task = await prisma.task.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};