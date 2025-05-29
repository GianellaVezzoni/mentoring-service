"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricNotExistException = void 0;
class MetricNotExistException extends Error {
    constructor(message) {
        super(message || "Metrica inexistente");
        this.name = "MetricNotExistException";
    }
}
exports.MetricNotExistException = MetricNotExistException;
