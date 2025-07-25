"use strict";
/// <reference path="../types/express.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await database_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await database_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ token, user: { id: user.id, name, email } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await database_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token, user: { id: user.id, name: user.name, email } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getProfile = getProfile;
