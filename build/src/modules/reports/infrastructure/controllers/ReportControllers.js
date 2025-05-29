"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportControllers = void 0;
const api_1 = require("../../../../helpers/api");
const utils_1 = require("../../../../helpers/utils");
const InvalidIdException_1 = require("../../core/exceptions/InvalidIdException");
const ReportNotExistException_1 = require("../../core/exceptions/ReportNotExistException");
const ReportControllers = ({ save, edit, remove, getAll, getById, getByUser, getGeneralMetrics, getCsvFileData, }) => {
    const errorResponses = (0, utils_1.createHashMap)({
        [ReportNotExistException_1.ReportNotExistException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 404),
        [InvalidIdException_1.InvalidIdException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 400),
        [Error.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 500),
    }, (res, error) => (0, api_1.ErrorResponse)(res, error));
    return {
        save(req, res) {
            const saveExecution = save.execute(req.body);
            saveExecution
                .then((report) => {
                const message = `Reporte creado correctamente`;
                (0, api_1.SuccessResponse)(res, 201, message, report);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        edit(req, res) {
            const editExecution = edit.execute(req.body, req.params.id);
            editExecution
                .then((report) => {
                const message = `Reporte editado correctamente`;
                (0, api_1.SuccessResponse)(res, 200, message, report);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        remove(req, res) {
            const deleteExecution = remove.execute(req.params.id);
            deleteExecution
                .then((report) => {
                const message = `Reporte eliminado correctamente`;
                (0, api_1.SuccessResponse)(res, 200, message, report);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        get(req, res) {
            const getExecution = getAll.execute(req.query);
            getExecution
                .then(({ reports, pagination }) => {
                const message = `Reportes obtenidos con exito`;
                (0, api_1.SuccessResponse)(res, 200, message, reports, pagination);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getById(req, res) {
            const getByIdExecution = getById.execute(req.params.id);
            const message = `Reporte obtenido con exito`;
            getByIdExecution
                .then((report) => {
                (0, api_1.SuccessResponse)(res, 200, message, report);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getByUser(req, res) {
            const getByUserExecution = getByUser.execute(req.params.userId);
            getByUserExecution
                .then((report) => {
                const message = `Reportes obtenidos con exito`;
                (0, api_1.SuccessResponse)(res, 200, message, report);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getGeneralMetrics(req, res) {
            const getGeneralMetricsExecution = getGeneralMetrics.execute();
            getGeneralMetricsExecution
                .then((metrics) => {
                (0, api_1.SuccessResponse)(res, 200, "General metrics obtained successfully", metrics);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getCsvFileData(req, res) {
            const getCsvFileDataExecution = getCsvFileData.execute(req.query);
            getCsvFileDataExecution
                .then((csvFile) => {
                (0, api_1.SuccessResponse)(res, 200, "CSV file generated successfully", csvFile);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
    };
};
exports.ReportControllers = ReportControllers;
