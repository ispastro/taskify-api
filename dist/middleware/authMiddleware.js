"use strict";
/// <reference path="../types/express.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        const error = new Error('Authentication required: No token provided');
        console.error(`[${new Date().toISOString()}] ${error.message}`);
        return res.status(401).json({ error: error.message });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield database_1.default.user.findUnique({
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
    }
    catch (error) {
        const err = error instanceof Error ? error : new Error('Invalid token');
        console.error(`[${new Date().toISOString()}] Authentication error: ${err.message}`, err.stack);
        res.status(401).json({ error: 'Invalid token', details: err.message });
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=authMiddleware.js.map