import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getMetricControllers } from "../controllers/controllersProvider";

const getMetricRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, get, getById } =
    getMetricControllers(dependencyManager);
  const metricRouter = Router();
  const path = "metrics";

  metricRouter.post(`/${path}`, [jwtValidator], save);
  metricRouter.get(`/${path}`, [jwtValidator], get);
  metricRouter.get(`/${path}/:id`, [jwtValidator], getById);
  metricRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  metricRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  return metricRouter;
};
const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getMetricRoutes;
