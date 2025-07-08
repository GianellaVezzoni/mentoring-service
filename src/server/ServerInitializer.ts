import configs from "../configs";

const express = require("express");
const InitializeServer = () => {
  const app = express();
  app.set("port", configs.api.port);
  console.log("app.get(", app.get("port"));
  app.listen(app.get("port"), () => {
    console.log("Servidor iniciado, puerto " + app.get("port"));
  });
  return app;
};

export default InitializeServer;
