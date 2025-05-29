"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const api_1 = require("../../../../helpers/api");
const utils_1 = require("../../../../helpers/utils");
const InvalidIdException_1 = require("../../core/exceptions/InvalidIdException");
const UserNotActiveException_1 = require("../../core/exceptions/UserNotActiveException");
const UserNotExistException_1 = require("../../core/exceptions/UserNotExistException");
const WrongCredentialsException_1 = require("../../core/exceptions/WrongCredentialsException");
const name = "Usuario";
const pronoun = "o";
const UserControllers = ({ save, edit, remove, getAll, getById, login, getMentors, getMentees, }) => {
    const errorResponses = (0, utils_1.createHashMap)({
        [UserNotExistException_1.UserNotExistException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 404),
        [UserNotActiveException_1.UserNotActiveException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 409),
        [WrongCredentialsException_1.WrongCredentialsException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 401),
        [InvalidIdException_1.InvalidIdException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 400),
    }, (res, error) => (0, api_1.ErrorResponse)(res, error));
    return {
        save(req, res) {
            const saveExecution = save.execute(req.body);
            saveExecution
                .then((user) => {
                const message = `${name} cread${pronoun} correctamente`;
                (0, api_1.SuccessResponse)(res, 201, message, user);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        edit(req, res) {
            const editExecution = edit.execute(req.body, req.params.id);
            editExecution
                .then((user) => {
                const message = `${name} editad${pronoun} correctamente`;
                (0, api_1.SuccessResponse)(res, 200, message, user);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        remove(req, res) {
            const deleteExecution = remove.execute(req.params.id);
            deleteExecution
                .then((user) => {
                const message = `${name} eliminad${pronoun} correctamente`;
                (0, api_1.SuccessResponse)(res, 200, message, user);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        get(req, res) {
            const getExecution = getAll.execute(req.query);
            getExecution
                .then(({ users, pagination }) => {
                const message = `${name}s obtenid${pronoun}s con exito`;
                (0, api_1.SuccessResponse)(res, 200, message, users, pagination);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getById(req, res) {
            const getByIdExecution = getById.execute(req.params.id);
            const message = `${name} obtenid${pronoun} con exito`;
            getByIdExecution
                .then((user) => {
                (0, api_1.SuccessResponse)(res, 200, message, user);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        login(req, res) {
            const loginExecution = login.execute(req.body);
            const message = "Inicio de sesión exitoso";
            loginExecution
                .then((result) => {
                (0, api_1.SuccessResponse)(res, 200, message, result);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getMentors(req, res) {
            const getMentorsExecution = getMentors.execute();
            getMentorsExecution
                .then((mentors) => {
                (0, api_1.SuccessResponse)(res, 200, "Mentores obtenidos con éxito", mentors);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        getMentees(req, res) {
            const getMenteesExecution = getMentees.execute(req.params.id);
            getMenteesExecution
                .then((mentees) => {
                (0, api_1.SuccessResponse)(res, 200, "Mentees obtenidos con éxito", mentees);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
    };
};
exports.UserControllers = UserControllers;
