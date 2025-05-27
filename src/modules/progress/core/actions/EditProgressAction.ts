import { isObjectIdOrHexString } from "mongoose";
import IProgress from "../entities/IProgress";
import { IProgressRepository } from "../repository/IMongoProgressRepository";
import { InvalidIdException } from "../exceptions/InvalidIdException";
export interface IEditProgressAction {
  execute: (body: IProgress, id: string) => Promise<any>;
}

export const EditProgressAction = (
  ProgressRepository: IProgressRepository
): IEditProgressAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          const result = await ProgressRepository.edit(
            { ...body, updatedAt: new Date() },
            id
          );
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
