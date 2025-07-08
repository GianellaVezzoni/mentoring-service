import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getUserControllers } from "../controllers/controllersProvider";

const getUserRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, get, getById, login, getMentors, getMentees } =
    getUserControllers(dependencyManager);
  const userRouter = Router();
  const path = "users";

  userRouter.post(`/login`, login);
  userRouter.post(`/${path}`, save);
  userRouter.get(`/${path}`, [jwtValidator], get);
  userRouter.get(`/${path}/mentors`, [jwtValidator], getMentors);
  userRouter.get(`/${path}/mentees/:id`, [jwtValidator], getMentees);
  userRouter.get(`/${path}/:id`, [jwtValidator], getById);
  userRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  userRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  return userRouter;
};
const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getUserRoutes;
