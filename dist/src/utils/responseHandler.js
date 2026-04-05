"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaginatedResponse = exports.sendResponse = void 0;
const sendResponse = (res, statusCode, data, message = 'Success') => {
    res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
const sendPaginatedResponse = (res, statusCode, data, meta, message = 'Success') => {
    res.status(statusCode).json({
        status: 'success',
        message,
        data,
        meta,
    });
};
exports.sendPaginatedResponse = sendPaginatedResponse;
//# sourceMappingURL=responseHandler.js.map