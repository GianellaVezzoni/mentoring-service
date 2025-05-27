import { IProgressRepository } from "../repository/IMongoProgressRepository";
import { GetProgressByIdAction } from "./GetProgressByIdAction";
import { GetAllProgressAction } from "./GetAllProgressAction";
import { RemoveProgressAction } from "./RemoveProgressAction";
import { EditProgressAction } from "./EditProgressAction";
import { SaveProgressAction } from "./SaveProgressAction";
import { IGetProgressByIdAction } from "./GetProgressByIdAction";
import { IGetAllProgressAction } from "./GetAllProgressAction";
import { IRemoveProgressAction } from "./RemoveProgressAction";
import { ISaveProgressAction } from "./SaveProgressAction";
import { IEditProgressAction } from "./EditProgressAction";
import {
  IGetProgressByUserAction,
  GetProgressByUserAction,
} from "./GetProgressByUserAction";

export interface IProgressActions {
  save: ISaveProgressAction;
  edit: IEditProgressAction;
  remove: IRemoveProgressAction;
  getAll: IGetAllProgressAction;
  getById: IGetProgressByIdAction;
  getByUser: IGetProgressByUserAction;
}

export const getProgressActions = (progressRepository: IProgressRepository) => {
  const ProgressActions: IProgressActions = {
    save: SaveProgressAction(progressRepository),
    edit: EditProgressAction(progressRepository),
    remove: RemoveProgressAction(progressRepository),
    getAll: GetAllProgressAction(progressRepository),
    getById: GetProgressByIdAction(progressRepository),
    getByUser: GetProgressByUserAction(progressRepository),
  };
  return ProgressActions;
};
