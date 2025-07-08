"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyManager_1 = require("./dependencyManager");
const MidlewaresInitalizer_1 = __importDefault(require("./middlewares/MidlewaresInitalizer"));
const ModulesInitializer_1 = __importDefault(require("./modules/ModulesInitializer"));
const DbConnection_1 = __importDefault(require("./server/DbConnection"));
const MiddlewaresConfig_1 = __importDefault(require("./server/MiddlewaresConfig"));
const RoutesReducer_1 = __importDefault(require("./server/RoutesReducer"));
const ServerInitializer_1 = __importDefault(require("./server/ServerInitializer"));
const ServicesInitalizer_1 = __importDefault(require("./services/ServicesInitalizer"));
const dependencyManager = new dependencyManager_1.DependencyManager();
const app = (0, ServerInitializer_1.default)();
(0, DbConnection_1.default)();
(0, MiddlewaresConfig_1.default)(app);
(0, ServicesInitalizer_1.default)(dependencyManager);
(0, ModulesInitializer_1.default)(dependencyManager);
(0, MidlewaresInitalizer_1.default)(dependencyManager);
(0, RoutesReducer_1.default)(app, dependencyManager);
app.post("/admin/migrate", async (req, res) => {
    if (req.headers.authorization !== `${process.env.ADMIN_KEY}`) {
        return res.status(403).send("Unauthorized");
    }
    try {
        const migrate = require("../build/migrations/index.js");
        await migrate.up();
        return res.send("✅ Migraciones ejecutadas");
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("❌ Error al ejecutar migraciones");
    }
});
