import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IProgressActions } from "../../core/actions/actionsProvider";
import { ProgressNotExistException } from "../../core/exceptions/ProgressNotExistException";
import { InvalidIdException } from "../../core/exceptions/InvalidIdException";

const name = "Progreso";
const pronoun = "o";

export const ProgressControllers = ({
  save,
  edit,
  remove,
  getAll,
  getById,
  getByUser,
}: IProgressActions) => {
  const errorResponses = createHashMap(
    {
      [ProgressNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
      [InvalidIdException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 400),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    save(req: Request, res: Response) {
      const saveExecution = save.execute(req.body);
      saveExecution
        .then((progress) => {
          const message = `${name} cread${pronoun} correctamente`;
          SuccessResponse(res, 201, message, progress);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((progress) => {
          const message = `${name} editad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, progress);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    remove(req: Request, res: Response) {
      const deleteExecution = remove.execute(req.params.id);
      deleteExecution
        .then((progress) => {
          const message = `${name} eliminad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, progress);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    get(req: Request, res: Response) {
      const getExecution = getAll.execute(req.query);
      getExecution
        .then(({ progress, pagination }) => {
          const message = `${name}s obtenid${pronoun}s con exito`;
          SuccessResponse(res, 200, message, progress, pagination);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      const message = `${name} obtenid${pronoun} con exito`;
      getByIdExecution
        .then((progress) => {
          SuccessResponse(res, 200, message, progress);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getByUser(req: Request, res: Response) {
      const getByUserExecution = getByUser.execute(req.params.userId);
      getByUserExecution
        .then((progress) => {
          const message = `${name}s obtenid${pronoun}s con exito`;
          SuccessResponse(res, 200, message, progress);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
