"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllersProvider_1 = require("../controllers/controllersProvider");
const getMetricRoutes = (dependencyManager) => {
    const jwtValidator = getJwtValidator(dependencyManager);
    const { save, edit, remove, get, getById } = (0, controllersProvider_1.getMetricControllers)(dependencyManager);
    const metricRouter = (0, express_1.Router)();
    const path = "metrics";
    metricRouter.post(`/${path}`, [jwtValidator], save);
    metricRouter.get(`/${path}`, [jwtValidator], get);
    metricRouter.get(`/${path}/:id`, [jwtValidator], getById);
    metricRouter.patch(`/${path}/:id`, [jwtValidator], edit);
    metricRouter.delete(`/${path}/:id`, [jwtValidator], remove);
    return metricRouter;
};
const getJwtValidator = (dependencyManager) => {
    return dependencyManager.resolve("jwtValidator");
};
exports.default = getMetricRoutes;
