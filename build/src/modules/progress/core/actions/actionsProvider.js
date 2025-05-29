"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgressActions = void 0;
const GetProgressByIdAction_1 = require("./GetProgressByIdAction");
const GetAllProgressAction_1 = require("./GetAllProgressAction");
const RemoveProgressAction_1 = require("./RemoveProgressAction");
const EditProgressAction_1 = require("./EditProgressAction");
const SaveProgressAction_1 = require("./SaveProgressAction");
const GetProgressByUserAction_1 = require("./GetProgressByUserAction");
const getProgressActions = (progressRepository) => {
    const ProgressActions = {
        save: (0, SaveProgressAction_1.SaveProgressAction)(progressRepository),
        edit: (0, EditProgressAction_1.EditProgressAction)(progressRepository),
        remove: (0, RemoveProgressAction_1.RemoveProgressAction)(progressRepository),
        getAll: (0, GetAllProgressAction_1.GetAllProgressAction)(progressRepository),
        getById: (0, GetProgressByIdAction_1.GetProgressByIdAction)(progressRepository),
        getByUser: (0, GetProgressByUserAction_1.GetProgressByUserAction)(progressRepository),
    };
    return ProgressActions;
};
exports.getProgressActions = getProgressActions;
