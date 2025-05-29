"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserActions = void 0;
const EditUserAction_1 = require("./EditUserAction");
const GetAllUsersAction_1 = require("./GetAllUsersAction");
const GetMenteesAction_1 = require("./GetMenteesAction");
const GetMentorsAction_1 = require("./GetMentorsAction");
const GetOneUserAction_1 = require("./GetOneUserAction");
const GetUserByIdAction_1 = require("./GetUserByIdAction");
const LoginUserAction_1 = require("./LoginUserAction");
const RemoveUserAction_1 = require("./RemoveUserAction");
const SaveUserAction_1 = require("./SaveUserAction");
const getUserActions = (UserRepository, hashService) => {
    const UserActions = {
        save: (0, SaveUserAction_1.SaveUserAction)(UserRepository, hashService),
        edit: (0, EditUserAction_1.EditUserAction)(UserRepository, hashService),
        remove: (0, RemoveUserAction_1.RemoveUserAction)(UserRepository),
        getAll: (0, GetAllUsersAction_1.GetAllUsersAction)(UserRepository),
        getById: (0, GetUserByIdAction_1.GetUserByIdAction)(UserRepository),
        getOne: (0, GetOneUserAction_1.GetOneUserAction)(UserRepository),
        login: (0, LoginUserAction_1.LoginUserAction)(UserRepository, hashService),
        getMentors: (0, GetMentorsAction_1.GetMentorsAction)(UserRepository),
        getMentees: (0, GetMenteesAction_1.GetMenteesAction)(UserRepository),
    };
    return UserActions;
};
exports.getUserActions = getUserActions;
