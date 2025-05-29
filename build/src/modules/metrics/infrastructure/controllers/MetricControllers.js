"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricControllers = void 0;
const api_1 = require("../../../../helpers/api");
const utils_1 = require("../../../../helpers/utils");
const MetricNotExistException_1 = require("../../core/exceptions/MetricNotExistException");
const InvalidIdException_1 = require("../../core/exceptions/InvalidIdException");
const MetricControllers = ({ save, edit, remove, getAll, getById, }) => {
    const errorResponses = (0, utils_1.createHashMap)({
        [MetricNotExistException_1.MetricNotExistException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 404),
        [InvalidIdException_1.InvalidIdException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 400),
    }, (res, error) => (0, api_1.ErrorResponse)(res, error));
    return {
        save(req, res) {
            const saveExecution = save.execute(req.body);
            saveExecution
                .then((metric) => {
                const message = `Metrica creada correctamente`;
                (0, api_1.SuccessResponse)(res, 201, message, metric);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        edit(req, res) {
            const editExecution = edit.execute(req.body, req.params.id);
            editExecution
                .then((metric) => {
                const message = `Metrica editada correctamente`;
                (0, api_1.SuccessResponse)(res, 200, message, metric);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        remove(req, res) {
            const deleteExecution = remove.execute(req.params.id);
            deleteExecution
                .then((metric) => {
                const message = `Metrica eliminada correctamente`;
                (0, api_1.SuccessResponse)(res, 200, message, metric);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        get(req, res) {
            const getExecution = getAll.execute(req.query);
            getExecution
                .then(({ metrics, pagination }) => {
                const message = `Metricas obtenidas con exito`;
                (0, api_1.SuccessResponse)(res, 200, message, metrics, pagination);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getById(req, res) {
            const getByIdExecution = getById.execute(req.params.id);
            const message = `Metrica obtenida con exito`;
            getByIdExecution
                .then((metric) => {
                (0, api_1.SuccessResponse)(res, 200, message, metric);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
    };
};
exports.MetricControllers = MetricControllers;
