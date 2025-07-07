import { Application } from "express";

export const RunMigrations = (app: Application) => {
  app.post("/admin/migrate", async (req, res) => {
    if (req.headers.authorization !== `${process.env.ADMIN_KEY}`) {
      return res.status(403).send("Unauthorized");
    }

    try {
      const migrate = require("../../../build/migrations/index.js");
      await migrate.up();
      res.send("✅ Migraciones ejecutadas");
    } catch (err) {
      console.error(err);
      res.status(500).send("❌ Error al ejecutar migraciones");
    }
  });
};
