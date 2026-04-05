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
exports.getWeeklySummary = exports.getRecentActivity = exports.getMonthlyTrends = exports.getCategoryBreakdown = exports.getSummary = void 0;
const dashboardService = __importStar(require("./dashboard.service"));
const responseHandler_1 = require("../../utils/responseHandler");
const getSummary = async (req, res, next) => {
    try {
        const result = await dashboardService.getSummary();
        (0, responseHandler_1.sendResponse)(res, 200, result);
    }
    catch (error) {
        next(error);
    }
};
exports.getSummary = getSummary;
const getCategoryBreakdown = async (req, res, next) => {
    try {
        const result = await dashboardService.getCategoryBreakdown();
        (0, responseHandler_1.sendResponse)(res, 200, result);
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoryBreakdown = getCategoryBreakdown;
const getMonthlyTrends = async (req, res, next) => {
    try {
        const result = await dashboardService.getMonthlyTrends();
        (0, responseHandler_1.sendResponse)(res, 200, result);
    }
    catch (error) {
        next(error);
    }
};
exports.getMonthlyTrends = getMonthlyTrends;
const getRecentActivity = async (req, res, next) => {
    try {
        const result = await dashboardService.getRecentActivity();
        (0, responseHandler_1.sendResponse)(res, 200, result);
    }
    catch (error) {
        next(error);
    }
};
exports.getRecentActivity = getRecentActivity;
const getWeeklySummary = async (req, res, next) => {
    try {
        const result = await dashboardService.getWeeklySummary();
        (0, responseHandler_1.sendResponse)(res, 200, result);
    }
    catch (error) {
        next(error);
    }
};
exports.getWeeklySummary = getWeeklySummary;
//# sourceMappingURL=dashboard.controller.js.map