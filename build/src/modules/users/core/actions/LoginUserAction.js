"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserAction = void 0;
const generate_jwt_1 = __importDefault(require("../../../../helpers/generate-jwt"));
const UserNotExistException_1 = require("../exceptions/UserNotExistException");
const UserNotActiveException_1 = require("../exceptions/UserNotActiveException");
const WrongCredentialsException_1 = require("../exceptions/WrongCredentialsException");
const LoginUserAction = (userRepository, hashService) => {
    return {
        execute(credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    const user = await userRepository.getOne({ email: credentials.email });
                    if (!user)
                        throw new UserNotExistException_1.UserNotExistException();
                    if (!user.status)
                        throw new UserNotActiveException_1.UserNotActiveException();
                    const validPassword = hashService.compare(credentials.password, user.password);
                    if (!validPassword)
                        throw new WrongCredentialsException_1.WrongCredentialsException();
                    const token = await (0, generate_jwt_1.default)(user.id);
                    resolve({
                        user,
                        token
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        }
    };
};
exports.LoginUserAction = LoginUserAction;
