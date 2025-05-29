"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPemFromValue = exports.checkForDuplicate = exports.createHashMap = exports.mongoObjectNormalizer = void 0;
const fs = require('fs');
const mongoObjectNormalizer = (object) => {
    return JSON.parse(JSON.stringify(object));
};
exports.mongoObjectNormalizer = mongoObjectNormalizer;
const createHashMap = (objectToMap, defaultValue) => {
    const handler = {
        get: function (target, name) {
            return target.hasOwnProperty(name) ? target[name] : defaultValue;
        }
    };
    const map = Object.keys(objectToMap).reduce((map, property) => {
        const mapPart = property.split(',').reduce((map, splitedProperty) => {
            return { ...map, [splitedProperty]: objectToMap[property] };
        }, {});
        return { ...map, ...mapPart };
    }, {});
    return new Proxy(map, handler);
};
exports.createHashMap = createHashMap;
const checkForDuplicate = (array, keyName) => {
    return new Set(array.map(item => item[keyName])).size !== array.length;
};
exports.checkForDuplicate = checkForDuplicate;
const getPemFromValue = (value, path) => {
    const pathWithExtention = path + '.pem';
    fs.writeFileSync(pathWithExtention, value);
    const file = fs.readFileSync(pathWithExtention);
    fs.unlinkSync(pathWithExtention);
    return file;
};
exports.getPemFromValue = getPemFromValue;
