"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = __importDefault(require("../../../configs"));
const jwt = require("jsonwebtoken");
const getJwtValidator = (UserRepository) => {
    const jwtValidator = async (req, res, next) => {
        const bearerHeader = req.header("authorization");
        if (!bearerHeader) {
            res.status(401).json({
                status: 401,
                success: false,
                msg: "No hay token en la petición",
                type: "auth",
            });
            return;
        }
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        if (!token) {
            res.status(401).json({
                status: 401,
                success: false,
                msg: "Se necesita el prefijo Bearer",
                type: "auth",
            });
            return;
        }
        try {
            const { id } = jwt.verify(token, configs_1.default.secret_key);
            const user = await UserRepository.getById(id);
            if (!user) {
                res.status(401).json({
                    status: 401,
                    success: false,
                    msg: "Token no válido - usuario no existe",
                    type: "auth",
                });
                return;
            }
            if (!user.status) {
                res.status(401).json({
                    status: 401,
                    success: false,
                    msg: "Token no válido - usuario inactivo",
                    type: "auth",
                });
                return;
            }
            next();
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
            res.status(401).json({
                status: 401,
                success: false,
                msg: error.name === "TokenExpiredError"
                    ? "Sesión expirada"
                    : "Token no válido",
                type: "auth",
            });
            return;
        }
    };
    return jwtValidator;
};
exports.default = getJwtValidator;
