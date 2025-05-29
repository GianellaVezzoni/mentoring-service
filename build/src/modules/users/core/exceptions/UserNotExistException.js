"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotExistException = void 0;
class UserNotExistException extends Error {
    constructor(message) {
        super(message || "Usuario inexistente");
        this.name = 'UserNotExistException';
    }
}
exports.UserNotExistException = UserNotExistException;
