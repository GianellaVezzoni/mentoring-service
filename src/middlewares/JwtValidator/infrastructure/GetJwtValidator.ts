import { NextFunction, Request, Response } from "express";
import configs from "../../../configs";
import { IUserRepository } from "../../../modules/users/core/repository/IMongoUserRepository";
import { IJwtValidator } from "../core/IJwtValidator";
const jwt = require("jsonwebtoken");

const getJwtValidator = (UserRepository: IUserRepository): IJwtValidator => {
  const jwtValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const bearerHeader = req.header("authorization");
    if (!bearerHeader) {
      res.status(401).json({
        status: 401,
        success: false,
        msg: "No hay token en la petición",
        type: "auth",
      });
      return;
    }

    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    if (!token) {
      res.status(401).json({
        status: 401,
        success: false,
        msg: "Se necesita el prefijo Bearer",
        type: "auth",
      });
      return;
    }

    try {
      const { id } = jwt.verify(token, configs.secret_key);
      //leer user
      const user = await UserRepository.getById(id);
      //si el user existe
      if (!user) {
        res.status(401).json({
          status: 401,
          success: false,
          msg: "Token no válido - usuario no existe",
          type: "auth",
        });
        return;
      }
      //verificar si el uid es de un user activo
      if (!user.status) {
        res.status(401).json({
          status: 401,
          success: false,
          msg: "Token no válido - usuario inactivo",
          type: "auth",
        });
        return;
      }
      next();
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      res.status(401).json({
        status: 401,
        success: false,
        msg:
          error.name === "TokenExpiredError"
            ? "Sesión expirada"
            : "Token no válido",
        type: "auth",
      });
      return;
    }
  };

  return jwtValidator;
};

export default getJwtValidator;
