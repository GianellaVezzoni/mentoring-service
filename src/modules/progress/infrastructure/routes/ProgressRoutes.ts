import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/jwtValidator/core/IJwtValidator";
import { getProgressControllers } from "../controllers/controllersProvider";
const getProgressRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, get, getById, getByUser } =
    getProgressControllers(dependencyManager);
  const progressRouter = Router();
  const path = "progress";

  progressRouter.post(`/${path}`, [jwtValidator], save);
  progressRouter.get(`/${path}`, [jwtValidator], get);
  progressRouter.get(`/${path}/:id`, [jwtValidator], getById);
  progressRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  progressRouter.delete(`/${path}/:id`, [jwtValidator], remove);
  progressRouter.get(`/${path}/by-user/:userId`, [jwtValidator], getByUser);

  return progressRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getProgressRoutes;
