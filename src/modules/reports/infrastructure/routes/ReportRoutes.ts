import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/jwtValidator/core/IJwtValidator";
import { getReportControllers } from "../controllers/controllersProvider";

const getReportRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const {
    save,
    edit,
    remove,
    get,
    getById,
    getByUser,
    getGeneralMetrics,
    getCsvFileData,
  } = getReportControllers(dependencyManager);
  const reportRouter = Router();
  const path = "reports";

  reportRouter.post(`/${path}`, [jwtValidator], save);
  reportRouter.get(`/${path}`, [jwtValidator], get);
  reportRouter.get(`/${path}/data`, [jwtValidator], getGeneralMetrics);
  reportRouter.get(`/${path}/data/csv`, [jwtValidator], getCsvFileData);
  reportRouter.get(`/${path}/:id`, [jwtValidator], getById);
  reportRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  reportRouter.delete(`/${path}/:id`, [jwtValidator], remove);
  reportRouter.get(`/${path}/by-user/:userId`, [jwtValidator], getByUser);
  return reportRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getReportRoutes;
