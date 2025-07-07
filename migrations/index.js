"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_migrate_ts_1 = require("mongo-migrate-ts");
const configs_1 = __importDefault(require("../src/configs"));
require('dotenv').config();
(0, mongo_migrate_ts_1.mongoMigrateCli)({
    uri: configs_1.default.migrations.uri,
    database: configs_1.default.migrations.db,
    migrationsDir: __dirname,
    migrationsCollection: 'migrations_collection',
});
