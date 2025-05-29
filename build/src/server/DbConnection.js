"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = __importDefault(require("../configs"));
const mongoose = require('mongoose');
const ConnectToDatabase = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(configs_1.default.api.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch((error) => console.log('Ocurrio un error', error));
    const connection = mongoose.connection;
    connection.once('open', () => console.log('Base de datos conectada', configs_1.default.api.uri));
};
exports.default = ConnectToDatabase;
