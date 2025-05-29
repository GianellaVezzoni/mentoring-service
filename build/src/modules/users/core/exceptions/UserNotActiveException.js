"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotActiveException = void 0;
class UserNotActiveException extends Error {
    constructor(message) {
        super(message || "El usuario se encuentra desactivado");
        this.name = 'UserNotActiveException';
    }
}
exports.UserNotActiveException = UserNotActiveException;
