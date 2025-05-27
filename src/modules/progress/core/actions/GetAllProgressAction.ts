import { IProgressRepository } from "../repository/IMongoProgressRepository";

export interface IGetAllProgressAction {
  execute: (query: any) => Promise<any>;
}

export const GetAllProgressAction = (
  ProgressRepository: IProgressRepository
): IGetAllProgressAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const progress = await ProgressRepository.get(query);
          resolve(progress);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
