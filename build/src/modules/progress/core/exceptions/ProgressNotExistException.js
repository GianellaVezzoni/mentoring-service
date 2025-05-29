"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressNotExistException = void 0;
class ProgressNotExistException extends Error {
    constructor(message) {
        super(message || "Progreso inexistente");
        this.name = "ProgressNotExistException";
    }
}
exports.ProgressNotExistException = ProgressNotExistException;
