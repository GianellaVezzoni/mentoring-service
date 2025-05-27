import { isObjectIdOrHexString } from "mongoose";
import { IProgressRepository } from "../repository/IMongoProgressRepository";
import { InvalidIdException } from "../exceptions/InvalidIdException";
import { ProgressNotExistException } from "../exceptions/ProgressNotExistException";
export interface IGetProgressByIdAction {
  execute: (id: string) => Promise<any>;
}

export const GetProgressByIdAction = (
  ProgressRepository: IProgressRepository
): IGetProgressByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          const progress = await ProgressRepository.getById(id);
          if (!progress) throw new ProgressNotExistException();
          resolve(progress);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
