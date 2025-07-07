import { Application } from "express";
import { mongoMigrateCli } from "mongo-migrate-ts";

export const RunMigrations = (app: Application) => {
  app.post("/admin/migrate", async (req, res) => {
    try {
      await mongoMigrateCli();
      res.send("✅ Migraciones ejecutadas");
    } catch (err) {
      res.status(500).send("❌ Error al ejecutar migraciones");
    }
  });
};
