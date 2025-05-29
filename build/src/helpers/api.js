"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
const SuccessResponse = (res, status, msg, result, pagination) => {
    return res.status(status).json({
        status,
        success: true,
        msg,
        result,
        pagination
    });
};
exports.SuccessResponse = SuccessResponse;
const ErrorResponse = (res, error, status = 500) => {
    res.status(status).json({
        status: status,
        success: false,
        msg: error.message,
        result: null,
        pagination: null
    });
};
exports.ErrorResponse = ErrorResponse;
