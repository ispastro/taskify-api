"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/tasks', authMiddleware_1.authenticate, taskController_1.createTask);
router.get('/tasks', authMiddleware_1.authenticate, taskController_1.getTasks);
router.patch('/tasks/:id', authMiddleware_1.authenticate, taskController_1.updateTask);
router.delete('/tasks/:id', authMiddleware_1.authenticate, taskController_1.deleteTask);
exports.default = router;
