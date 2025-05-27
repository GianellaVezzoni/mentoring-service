import { isObjectIdOrHexString } from "mongoose";
import { IProgressRepository } from "../repository/IMongoProgressRepository";
import { ProgressNotExistException } from "../exceptions/ProgressNotExistException";
import { InvalidIdException } from "../exceptions/InvalidIdException";
export interface IRemoveProgressAction {
  execute: (id: string) => Promise<any>;
}

export const RemoveProgressAction = (
  ProgressRepository: IProgressRepository
): IRemoveProgressAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          const progress = await ProgressRepository.getById(id);
          if (!progress) throw new ProgressNotExistException();
          await ProgressRepository.remove(id);
          resolve(progress);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
