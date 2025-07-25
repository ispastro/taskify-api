"use strict";
/// <reference path="../types/express.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const database_1 = __importDefault(require("../config/database"));
const createTask = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Task name is required' });
        }
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const task = await database_1.default.task.create({
            data: {
                name,
                status: 'pending',
                userId: req.user.id,
            },
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
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
            database_1.default.task.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
            }),
            database_1.default.task.count({ where }),
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
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getTasks = getTasks;
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        if (!['pending', 'completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Use "pending" or "completed"' });
        }
        const task = await database_1.default.task.findFirst({
            where: { id: Number(id), userId: req.user.id },
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const updatedTask = await database_1.default.task.update({
            where: { id: Number(id) },
            data: { status },
        });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const task = await database_1.default.task.findFirst({
            where: { id: Number(id), userId: req.user.id },
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await database_1.default.task.delete({ where: { id: Number(id) } });
        res.status(204).send({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteTask = deleteTask;
