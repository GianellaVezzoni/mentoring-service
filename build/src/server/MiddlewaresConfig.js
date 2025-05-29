"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const ConfigureServerMiddlewares = (app) => {
    app.use(morgan('dev'));
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
};
exports.default = ConfigureServerMiddlewares;
