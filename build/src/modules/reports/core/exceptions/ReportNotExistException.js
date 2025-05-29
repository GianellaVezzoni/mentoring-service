"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportNotExistException = void 0;
class ReportNotExistException extends Error {
    constructor(message) {
        super(message || "Reporte inexistente");
        this.name = "ReportNotExistException";
    }
}
exports.ReportNotExistException = ReportNotExistException;
