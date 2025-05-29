"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyManager = void 0;
class DependencyManager {
    _dependencies;
    constructor() {
        this._dependencies = new Map();
    }
    register(key, dependency) {
        if (this._dependencies.has(key)) {
            throw new Error(`Dependency key already registered: ${key}`);
        }
        if (dependency === undefined) {
            throw new Error(`Dependency is undefined: ${key}`);
        }
        this._dependencies.set(key, dependency);
    }
    resolve(key) {
        if (!this._dependencies.has(key)) {
            throw new Error(`Dependency not found: ${key}`);
        }
        if (this._dependencies.get(key) === undefined) {
            throw new Error(`Dependency is undefined: ${key}`);
        }
        return this._dependencies.get(key) || {};
    }
}
exports.DependencyManager = DependencyManager;
