import { IUserRepository } from "../repository/IMongoUserRepository";
import { IHashService } from "../services/IHashService";
import { EditUserAction, IEditUserAction } from "./EditUserAction";
import { GetAllUsersAction, IGetAllUsersAction } from "./GetAllUsersAction";
import { GetMenteesAction, IGetMenteesAction } from "./GetMenteesAction";
import { GetMentorsAction } from "./GetMentorsAction";
import { IGetMentorsAction } from "./GetMentorsAction";
import { GetOneUserAction, IGetOneUserAction } from "./GetOneUserAction";
import { GetUserByIdAction, IGetUserByIdAction } from "./GetUserByIdAction";
import { ILoginUserAction, LoginUserAction } from "./LoginUserAction";
import { IRemoveUserAction, RemoveUserAction } from "./RemoveUserAction";
import { ISaveUserAction, SaveUserAction } from "./SaveUserAction";
export interface IUserActions {
  save: ISaveUserAction;
  edit: IEditUserAction;
  remove: IRemoveUserAction;
  getAll: IGetAllUsersAction;
  getOne: IGetOneUserAction;
  getById: IGetUserByIdAction;
  login: ILoginUserAction;
  getMentors: IGetMentorsAction;
  getMentees: IGetMenteesAction;
}
export const getUserActions = (
  UserRepository: IUserRepository,
  hashService: IHashService
) => {
  const UserActions: IUserActions = {
    save: SaveUserAction(UserRepository, hashService),
    edit: EditUserAction(UserRepository, hashService),
    remove: RemoveUserAction(UserRepository),
    getAll: GetAllUsersAction(UserRepository),
    getById: GetUserByIdAction(UserRepository),
    getOne: GetOneUserAction(UserRepository),
    login: LoginUserAction(UserRepository, hashService),
    getMentors: GetMentorsAction(UserRepository),
    getMentees: GetMenteesAction(UserRepository),
  };
  return UserActions;
};
