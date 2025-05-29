"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passwordSetupControllersProvider_1 = require("../controllers/passwordSetupControllersProvider");
const getPasswordSetupRoutes = (dependencyManager) => {
    const { generateLink, validateToken, setPassword } = (0, passwordSetupControllersProvider_1.getPasswordSetupControllers)(dependencyManager);
    const passwordSetupRouter = (0, express_1.Router)();
    const path = "password-setup";
    passwordSetupRouter.post(`/${path}/generate-link`, generateLink);
    passwordSetupRouter.post(`/${path}/validate-token`, validateToken);
    passwordSetupRouter.post(`/${path}/set-password`, setPassword);
    return passwordSetupRouter;
};
exports.default = getPasswordSetupRoutes;
