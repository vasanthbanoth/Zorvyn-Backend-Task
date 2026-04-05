"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateStatus = exports.updateRole = exports.getUser = exports.getUsers = void 0;
const userService = __importStar(require("./user.service"));
const responseHandler_1 = require("../../utils/responseHandler");
const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { users, total } = await userService.getAllUsers(page, limit);
        (0, responseHandler_1.sendPaginatedResponse)(res, 200, users, {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }, 'Users successfully fetched');
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        (0, responseHandler_1.sendResponse)(res, 200, user, 'User successfully fetched');
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const updateRole = async (req, res, next) => {
    try {
        const user = await userService.updateUserRole(req.params.id, req.body.role);
        (0, responseHandler_1.sendResponse)(res, 200, user, 'User role successfully updated');
    }
    catch (error) {
        next(error);
    }
};
exports.updateRole = updateRole;
const updateStatus = async (req, res, next) => {
    try {
        const user = await userService.updateUserStatus(req.params.id, req.body.status);
        (0, responseHandler_1.sendResponse)(res, 200, user, 'User status successfully updated');
    }
    catch (error) {
        next(error);
    }
};
exports.updateStatus = updateStatus;
const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        (0, responseHandler_1.sendResponse)(res, 204, null, 'User successfully deleted');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map