import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IMetricActions } from "../../core/actions/actionProvider";
import { MetricNotExistException } from "../../core/exceptions/MetricNotExistException";
import { InvalidIdException } from "../../core/exceptions/InvalidIdException";

export const MetricControllers = ({
  save,
  edit,
  remove,
  getAll,
  getById,
}: IMetricActions) => {
  const errorResponses = createHashMap(
    {
      [MetricNotExistException.name]: (res: Response, error: Error) =>
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
        .then((metric) => {
          const message = `Metrica creada correctamente`;
          SuccessResponse(res, 201, message, metric);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((metric) => {
          const message = `Metrica editada correctamente`;
          SuccessResponse(res, 200, message, metric);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    remove(req: Request, res: Response) {
      const deleteExecution = remove.execute(req.params.id);
      deleteExecution
        .then((metric) => {
          const message = `Metrica eliminada correctamente`;
          SuccessResponse(res, 200, message, metric);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    get(req: Request, res: Response) {
      const getExecution = getAll.execute(req.query);
      getExecution
        .then((metrics) => {
          const message = `Metricas obtenidas con exito`;
          SuccessResponse(res, 200, message, metrics);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      const message = `Metrica obtenida con exito`;
      getByIdExecution
        .then((metric) => {
          SuccessResponse(res, 200, message, metric);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
