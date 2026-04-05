"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../config/database"));
const AppError_1 = require("../../utils/AppError");
const registerUser = async (email, password, role = 'VIEWER') => {
    const existingUser = await database_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError_1.AppError('Email already in use', 400);
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 12);
    const user = await database_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            role,
        },
    });
    const token = signToken(user.id, user.role, user.status);
    return { user: { id: user.id, email: user.email, role: user.role, status: user.status }, token };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await database_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError_1.AppError('Invalid credentials', 401);
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new AppError_1.AppError('Invalid credentials', 401);
    }
    if (user.status === 'INACTIVE') {
        throw new AppError_1.AppError('Account is inactive. Contact support.', 403);
    }
    const token = signToken(user.id, user.role, user.status);
    return { user: { id: user.id, email: user.email, role: user.role, status: user.status }, token };
};
exports.loginUser = loginUser;
const signToken = (id, role, status) => {
    return jsonwebtoken_1.default.sign({ id, role, status }, process.env.JWT_SECRET || 'secret', {
        expiresIn: (process.env.JWT_EXPIRES_IN || '24h'),
    });
};
//# sourceMappingURL=auth.service.js.map