"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidIdException = void 0;
class InvalidIdException extends Error {
    constructor(message) {
        super(message || "El id es invalido");
        this.name = "InvalidIdException";
    }
}
exports.InvalidIdException = InvalidIdException;
