"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_token = require("jsonwebtoken");
const configs_1 = __importDefault(require("../configs"));
const generateJWT = async (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt_token.sign(payload, configs_1.default.secret_key, { expiresIn: "1d" }, (err, token) => {
            if (err) {
                reject("No se pudo generar token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generateJWT;
