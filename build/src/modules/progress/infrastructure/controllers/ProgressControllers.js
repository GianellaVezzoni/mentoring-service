"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressControllers = void 0;
const api_1 = require("../../../../helpers/api");
const utils_1 = require("../../../../helpers/utils");
const ProgressNotExistException_1 = require("../../core/exceptions/ProgressNotExistException");
const InvalidIdException_1 = require("../../core/exceptions/InvalidIdException");
const name = "Progreso";
const pronoun = "o";
const ProgressControllers = ({ save, edit, remove, getAll, getById, getByUser, }) => {
    const errorResponses = (0, utils_1.createHashMap)({
        [ProgressNotExistException_1.ProgressNotExistException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 404),
        [InvalidIdException_1.InvalidIdException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 400),
    }, (res, error) => (0, api_1.ErrorResponse)(res, error));
    return {
        save(req, res) {
            const saveExecution = save.execute(req.body);
            saveExecution
                .then((progress) => {
                const message = `${name} cread${pronoun} correctamente`;
                (0, api_1.SuccessResponse)(res, 201, message, progress);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        edit(req, res) {
            const editExecution = edit.execute(req.body, req.params.id);
            editExecution
                .then((progress) => {
                const message = `${name} editad${pronoun} correctamente`;
                (0, api_1.SuccessResponse)(res, 200, message, progress);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        remove(req, res) {
            const deleteExecution = remove.execute(req.params.id);
            deleteExecution
                .then((progress) => {
                const message = `${name} eliminad${pronoun} correctamente`;
                (0, api_1.SuccessResponse)(res, 200, message, progress);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        get(req, res) {
            const getExecution = getAll.execute(req.query);
            getExecution
                .then(({ progress, pagination }) => {
                const message = `${name}s obtenid${pronoun}s con exito`;
                (0, api_1.SuccessResponse)(res, 200, message, progress, pagination);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getById(req, res) {
            const getByIdExecution = getById.execute(req.params.id);
            const message = `${name} obtenid${pronoun} con exito`;
            getByIdExecution
                .then((progress) => {
                (0, api_1.SuccessResponse)(res, 200, message, progress);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getByUser(req, res) {
            const getByUserExecution = getByUser.execute(req.params.userId);
            getByUserExecution
                .then((progress) => {
                const message = `${name}s obtenid${pronoun}s con exito`;
                (0, api_1.SuccessResponse)(res, 200, message, progress);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
    };
};
exports.ProgressControllers = ProgressControllers;
