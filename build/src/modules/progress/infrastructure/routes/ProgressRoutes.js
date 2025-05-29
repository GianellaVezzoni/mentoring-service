"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllersProvider_1 = require("../controllers/controllersProvider");
const getProgressRoutes = (dependencyManager) => {
    const jwtValidator = getJwtValidator(dependencyManager);
    const { save, edit, remove, get, getById, getByUser } = (0, controllersProvider_1.getProgressControllers)(dependencyManager);
    const progressRouter = (0, express_1.Router)();
    const path = "progress";
    progressRouter.post(`/${path}`, [jwtValidator], save);
    progressRouter.get(`/${path}`, [jwtValidator], get);
    progressRouter.get(`/${path}/:id`, [jwtValidator], getById);
    progressRouter.patch(`/${path}/:id`, [jwtValidator], edit);
    progressRouter.delete(`/${path}/:id`, [jwtValidator], remove);
    progressRouter.get(`/${path}/by-user/:userId`, [jwtValidator], getByUser);
    return progressRouter;
};
const getJwtValidator = (dependencyManager) => {
    return dependencyManager.resolve("jwtValidator");
};
exports.default = getProgressRoutes;
