import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IReportActions } from "../../core/actions/actionsProvider";
import { InvalidIdException } from "../../core/exceptions/InvalidIdException";
import { ReportNotExistException } from "../../core/exceptions/ReportNotExistException";

export const ReportControllers = ({
  save,
  edit,
  remove,
  getAll,
  getById,
  getByUser,
  getGeneralMetrics,
  getCsvFileData,
}: IReportActions) => {
  const errorResponses = createHashMap(
    {
      [ReportNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
      [InvalidIdException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 400),
      [Error.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 500),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    save(req: Request, res: Response) {
      const saveExecution = save.execute(req.body);
      saveExecution
        .then((report) => {
          const message = `Reporte creado correctamente`;
          SuccessResponse(res, 201, message, report);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((report) => {
          const message = `Reporte editado correctamente`;
          SuccessResponse(res, 200, message, report);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    remove(req: Request, res: Response) {
      const deleteExecution = remove.execute(req.params.id);
      deleteExecution
        .then((report) => {
          const message = `Reporte eliminado correctamente`;
          SuccessResponse(res, 200, message, report);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    get(req: Request, res: Response) {
      const getExecution = getAll.execute(req.query);
      getExecution
        .then((reports) => {
          const message = `Reportes obtenidos con exito`;
          SuccessResponse(res, 200, message, reports);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      const message = `Reporte obtenido con exito`;
      getByIdExecution
        .then((report) => {
          SuccessResponse(res, 200, message, report);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getByUser(req: Request, res: Response) {
      const getByUserExecution = getByUser.execute(req.params.userId);
      getByUserExecution
        .then((report) => {
          const message = `Reportes obtenidos con exito`;
          SuccessResponse(res, 200, message, report);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getGeneralMetrics(req: Request, res: Response) {
      const getGeneralMetricsExecution = getGeneralMetrics.execute();
      getGeneralMetricsExecution
        .then((metrics) => {
          SuccessResponse(
            res,
            200,
            "General metrics obtained successfully",
            metrics
          );
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getCsvFileData(req: Request, res: Response) {
      const getCsvFileDataExecution = getCsvFileData.execute(req.query);
      getCsvFileDataExecution
        .then((csvFile) => {
          SuccessResponse(res, 200, "CSV file generated successfully", csvFile);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
