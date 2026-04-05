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
exports.remove = exports.update = exports.getTransaction = exports.getTransactions = exports.create = void 0;
const transactionService = __importStar(require("./transaction.service"));
const responseHandler_1 = require("../../utils/responseHandler");
const create = async (req, res, next) => {
    try {
        const transaction = await transactionService.createTransaction(req.user.id, req.body);
        (0, responseHandler_1.sendResponse)(res, 201, transaction, 'Transaction successfully created');
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const getTransactions = async (req, res, next) => {
    try {
        const filters = req.query;
        const { transactions, total } = await transactionService.getTransactions(filters);
        (0, responseHandler_1.sendPaginatedResponse)(res, 200, transactions, {
            total,
            page: filters.page,
            limit: filters.limit,
            totalPages: Math.ceil(total / filters.limit),
        }, 'Transactions successfully fetched');
    }
    catch (error) {
        next(error);
    }
};
exports.getTransactions = getTransactions;
const getTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.getTransactionById(req.params.id);
        (0, responseHandler_1.sendResponse)(res, 200, transaction, 'Transaction successfully fetched');
    }
    catch (error) {
        next(error);
    }
};
exports.getTransaction = getTransaction;
const update = async (req, res, next) => {
    try {
        const transaction = await transactionService.updateTransaction(req.params.id, req.body);
        (0, responseHandler_1.sendResponse)(res, 200, transaction, 'Transaction successfully updated');
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        await transactionService.softDeleteTransaction(req.params.id);
        (0, responseHandler_1.sendResponse)(res, 204, null, 'Transaction successfully deleted');
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
//# sourceMappingURL=transaction.controller.js.map