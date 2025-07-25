import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTasks);
router.patch('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);

export default router;