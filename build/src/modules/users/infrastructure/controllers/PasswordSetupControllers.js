"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordSetupControllers = void 0;
const api_1 = require("../../../../helpers/api");
const utils_1 = require("../../../../helpers/utils");
const UserNotExistException_1 = require("../../core/exceptions/UserNotExistException");
const PasswordSetupControllers = ({ generateLink, validateToken, setPassword, }) => {
    const errorResponses = (0, utils_1.createHashMap)({
        [UserNotExistException_1.UserNotExistException.name]: (res, error) => (0, api_1.ErrorResponse)(res, error, 404),
    }, (res, error) => (0, api_1.ErrorResponse)(res, error));
    return {
        generateLink(req, res) {
            const { email } = req.body;
            if (!email) {
                return (0, api_1.ErrorResponse)(res, new Error("Email is required"), 400);
            }
            const generateLinkExecution = generateLink.execute(email);
            generateLinkExecution
                .then((result) => {
                (0, api_1.SuccessResponse)(res, 200, result.message, {
                    token: result.token,
                    resetLink: result.resetLink,
                });
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        validateToken(req, res) {
            const { token } = req.body;
            if (!token) {
                return (0, api_1.ErrorResponse)(res, new Error("Token is required"), 400);
            }
            const validateTokenExecution = validateToken.execute(token);
            validateTokenExecution
                .then((result) => {
                const message = result.isValid
                    ? "Token is valid"
                    : "Token is invalid or expired";
                (0, api_1.SuccessResponse)(res, 200, message, result);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
        setPassword(req, res) {
            const { token, newPassword } = req.body;
            if (!token || !newPassword) {
                return (0, api_1.ErrorResponse)(res, new Error("Token and new password are required"), 400);
            }
            const setPasswordExecution = setPassword.execute(token, newPassword);
            setPasswordExecution
                .then((result) => {
                (0, api_1.SuccessResponse)(res, 200, result.message, result);
            })
                .catch((error) => {
                errorResponses[error.name](res, error);
            });
        },
    };
};
exports.PasswordSetupControllers = PasswordSetupControllers;
