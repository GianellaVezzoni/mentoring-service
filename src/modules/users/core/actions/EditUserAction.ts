import { isObjectIdOrHexString } from "mongoose";
import IUser from "../entities/IUser";
import { InvalidIdException } from "../exceptions/InvalidIdException";
import { IUserRepository } from "../repository/IMongoUserRepository";
import { IHashService } from "../services/IHashService";
import { IProgressRepository } from "../../../progress/core/repository/IMongoProgressRepository";

export interface IEditUserAction {
  execute: (body: IUser, id: string) => Promise<any>;
}
export const EditUserAction = (
  UserRepository: IUserRepository,
  hashService: IHashService
): IEditUserAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const { password } = body;
          if (password) {
            body.password = hashService.hash(password);
          }
          if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          await UserRepository.edit(body, id);
          const result = await UserRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
