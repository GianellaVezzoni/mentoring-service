"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllersProvider_1 = require("../controllers/controllersProvider");
const getUserRoutes = (dependencyManager) => {
    const jwtValidator = getJwtValidator(dependencyManager);
    const { save, edit, remove, get, getById, login, getMentors, getMentees } = (0, controllersProvider_1.getUserControllers)(dependencyManager);
    const userRouter = (0, express_1.Router)();
    const path = "users";
    userRouter.post(`/login`, login);
    userRouter.post(`/${path}`, [jwtValidator], save);
    userRouter.get(`/${path}`, [jwtValidator], get);
    userRouter.get(`/${path}/mentors`, [jwtValidator], getMentors);
    userRouter.get(`/${path}/mentees/:id`, [jwtValidator], getMentees);
    userRouter.get(`/${path}/:id`, [jwtValidator], getById);
    userRouter.patch(`/${path}/:id`, [jwtValidator], edit);
    userRouter.delete(`/${path}/:id`, [jwtValidator], remove);
    return userRouter;
};
const getJwtValidator = (dependencyManager) => {
    return dependencyManager.resolve("jwtValidator");
};
exports.default = getUserRoutes;
