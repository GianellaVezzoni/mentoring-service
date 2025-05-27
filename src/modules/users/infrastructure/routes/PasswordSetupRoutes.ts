import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { getPasswordSetupControllers } from "../controllers/passwordSetupControllersProvider";

const getPasswordSetupRoutes = (dependencyManager: DependencyManager) => {
  const { generateLink, validateToken, setPassword } =
    getPasswordSetupControllers(dependencyManager);
  const passwordSetupRouter = Router();
  const path = "password-setup";

  passwordSetupRouter.post(`/${path}/generate-link`, generateLink);
  passwordSetupRouter.post(`/${path}/validate-token`, validateToken);
  passwordSetupRouter.post(`/${path}/set-password`, setPassword);

  return passwordSetupRouter;
};

export default getPasswordSetupRoutes;
