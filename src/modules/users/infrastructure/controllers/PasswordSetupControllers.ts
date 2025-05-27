import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IPasswordSetupActions } from "../../core/actions/passwordSetupActionsProvider";
import { UserNotExistException } from "../../core/exceptions/UserNotExistException";

export const PasswordSetupControllers = ({
  generateLink,
  validateToken,
  setPassword,
}: IPasswordSetupActions) => {
  const errorResponses = createHashMap(
    {
      [UserNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    generateLink(req: Request, res: Response) {
      const { email } = req.body;

      if (!email) {
        return ErrorResponse(res, new Error("Email is required"), 400);
      }

      const generateLinkExecution = generateLink.execute(email);
      generateLinkExecution
        .then((result) => {
          SuccessResponse(res, 200, result.message, {
            token: result.token,
            resetLink: result.resetLink,
          });
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    validateToken(req: Request, res: Response) {
      const { token } = req.body;

      if (!token) {
        return ErrorResponse(res, new Error("Token is required"), 400);
      }

      const validateTokenExecution = validateToken.execute(token);
      validateTokenExecution
        .then((result) => {
          const message = result.isValid
            ? "Token is valid"
            : "Token is invalid or expired";
          SuccessResponse(res, 200, message, result);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    setPassword(req: Request, res: Response) {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) {
        return ErrorResponse(
          res,
          new Error("Token and new password are required"),
          400
        );
      }
      const setPasswordExecution = setPassword.execute(token, newPassword);
      setPasswordExecution
        .then((result) => {
          SuccessResponse(res, 200, result.message, result);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
