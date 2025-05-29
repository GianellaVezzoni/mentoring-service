"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = __importDefault(require("../configs"));
const express = require("express");
const InitializeServer = () => {
    const app = express();
    app.set('port', configs_1.default.api.port || 8080);
    app.listen(app.get('port'), () => {
        console.log('Servidor iniciado, puerto ' + app.get('port'));
    });
    return app;
};
exports.default = InitializeServer;
