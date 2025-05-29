"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllersProvider_1 = require("../controllers/controllersProvider");
const getReportRoutes = (dependencyManager) => {
    const jwtValidator = getJwtValidator(dependencyManager);
    const { save, edit, remove, get, getById, getByUser, getGeneralMetrics, getCsvFileData, } = (0, controllersProvider_1.getReportControllers)(dependencyManager);
    const reportRouter = (0, express_1.Router)();
    const path = "reports";
    reportRouter.post(`/${path}`, [jwtValidator], save);
    reportRouter.get(`/${path}`, [jwtValidator], get);
    reportRouter.get(`/${path}/data`, [jwtValidator], getGeneralMetrics);
    reportRouter.get(`/${path}/data/csv`, [jwtValidator], getCsvFileData);
    reportRouter.get(`/${path}/:id`, [jwtValidator], getById);
    reportRouter.patch(`/${path}/:id`, [jwtValidator], edit);
    reportRouter.delete(`/${path}/:id`, [jwtValidator], remove);
    reportRouter.get(`/${path}/by-user/:userId`, [jwtValidator], getByUser);
    return reportRouter;
};
const getJwtValidator = (dependencyManager) => {
    return dependencyManager.resolve("jwtValidator");
};
exports.default = getReportRoutes;
