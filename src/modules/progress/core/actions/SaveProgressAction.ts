import IProgress from "../entities/IProgress";
import { IProgressRepository } from "../repository/IMongoProgressRepository";

export interface ISaveProgressAction {
  execute: (body: IProgress) => Promise<any>;
}

export const SaveProgressAction = (
  progressRepository: IProgressRepository
): ISaveProgressAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await progressRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
