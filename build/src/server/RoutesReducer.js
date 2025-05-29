"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoutes_1 = __importDefault(require("../modules/users/infrastructure/routes/UserRoutes"));
const PasswordSetupRoutes_1 = __importDefault(require("../modules/users/infrastructure/routes/PasswordSetupRoutes"));
const ReportRoutes_1 = __importDefault(require("../modules/reports/infrastructure/routes/ReportRoutes"));
const ProgressRoutes_1 = __importDefault(require("../modules/progress/infrastructure/routes/ProgressRoutes"));
const MetricRoutes_1 = __importDefault(require("../modules/metrics/infrastructure/routes/MetricRoutes"));
const prefix = "/api/v1";
const ReduceRouters = (app, dependencyManager) => {
    app.use(prefix, (0, UserRoutes_1.default)(dependencyManager));
    app.use(prefix, (0, PasswordSetupRoutes_1.default)(dependencyManager));
    app.use(prefix, (0, ReportRoutes_1.default)(dependencyManager));
    app.use(prefix, (0, ProgressRoutes_1.default)(dependencyManager));
    app.use(prefix, (0, MetricRoutes_1.default)(dependencyManager));
};
exports.default = ReduceRouters;
