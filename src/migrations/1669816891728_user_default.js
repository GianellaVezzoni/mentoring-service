"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_default1669816891728 = void 0;
const configs_1 = __importDefault(require("../src/configs"));
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();
class user_default1669816891728 {
    async up(db) {
        db.collection('users').countDocuments().then(res => {
            const { name, email, password } = configs_1.default.user_default;
            if (res === 0) {
                db.collection('users').insertOne({
                    name,
                    email,
                    password: bcryptjs.hashSync(password, salt),
                    role: "ADMIN_ROLE",
                    status: true,
                    __v: 0
                }).then(res => {
                    console.log(JSON.stringify(res));
                })
                    .catch(error => {
                    console.log(JSON.stringify(error));
                });
            }
        })
            .catch(error => {
            console.log(JSON.stringify(error));
        });
    }
    async down(db) {
        const { name, email } = configs_1.default.user_default;
        db.collection('users').deleteOne({
            name,
            email,
            role: "ADMIN_ROLE",
            status: true,
            __v: 0
        }).then(res => {
            console.log(JSON.stringify(res));
        })
            .catch(error => {
            console.log(JSON.stringify(error));
        });
    }
}
exports.user_default1669816891728 = user_default1669816891728;
