"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptHashService = void 0;
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();
const BcryptHashService = () => ({
    hash(toHash) {
        return bcryptjs.hashSync(toHash, salt);
    },
    compare(toHash, hashed) {
        return bcryptjs.compareSync(toHash, hashed);
    }
});
exports.BcryptHashService = BcryptHashService;
