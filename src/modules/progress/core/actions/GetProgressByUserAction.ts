import { IProgressRepository } from "../repository/IMongoProgressRepository";

export interface IGetProgressByUserAction {
  execute: (userId: string) => Promise<any>;
}

export const GetProgressByUserAction = (
  progressRepository: IProgressRepository
): IGetProgressByUserAction => {
  return {
    execute: async (userId: string) => {
      return new Promise(async (resolve, reject) => {
        try {
          const progress = await progressRepository.getByUser(userId);
          resolve(progress);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
