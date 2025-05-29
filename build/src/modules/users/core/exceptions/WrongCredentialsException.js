"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongCredentialsException = void 0;
class WrongCredentialsException extends Error {
    constructor(message) {
        super(message || "Usuario o contraseña incorrectos");
        this.name = 'WrongCredentialsException';
    }
}
exports.WrongCredentialsException = WrongCredentialsException;
