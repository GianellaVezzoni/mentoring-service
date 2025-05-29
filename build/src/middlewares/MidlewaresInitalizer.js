"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtMiddlewareInitalizer_1 = __importDefault(require("./JwtValidator/JwtMiddlewareInitalizer"));
const MiddlewaresInitializer = (dependencyManager) => {
    (0, JwtMiddlewareInitalizer_1.default)(dependencyManager);
};
exports.default = MiddlewaresInitializer;
