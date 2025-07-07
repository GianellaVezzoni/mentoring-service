import { Application } from "express";
import { DependencyManager } from "./dependencyManager";
import MiddlewaresInitializer from "./middlewares/MidlewaresInitalizer";
import ModulesInitializer from "./modules/ModulesInitializer";
import ConnectToDatabase from "./server/DbConnection";
import ConfigureServerMiddlewares from "./server/MiddlewaresConfig";
import ReduceRouters from "./server/RoutesReducer";
import InitializeServer from "./server/ServerInitializer";
import ServicesInitializer from "./services/ServicesInitalizer";

const dependencyManager = new DependencyManager();

const app: Application = InitializeServer();

ConnectToDatabase();

ConfigureServerMiddlewares(app);

ServicesInitializer(dependencyManager);

ModulesInitializer(dependencyManager);

MiddlewaresInitializer(dependencyManager);

ReduceRouters(app, dependencyManager);

app.post("/admin/migrate", async (req, res) => {
  if (req.headers.authorization !== `${process.env.ADMIN_KEY}`) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const migrate = require("../../build/migrations/index.js");
    await migrate.up();
    return res.send("✅ Migraciones ejecutadas");
  } catch (err) {
    console.error(err);
    return res.status(500).send("❌ Error al ejecutar migraciones");
  }
});
