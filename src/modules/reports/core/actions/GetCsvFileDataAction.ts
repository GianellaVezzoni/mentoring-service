import { IUserRepository } from "../../../users/core/repository/IMongoUserRepository";
import { ICsvFileGenerationService } from "../../../../services/generateCsvFile/core/ICsvFileGenerationService";

export interface IGetCsvFileDataAction {
  execute: (body: any) => Promise<any>;
}

export const GetCsvFileDataAction = (
  userRepository: IUserRepository,
  csvFileGenerationService: ICsvFileGenerationService
): IGetCsvFileDataAction => {
  return {
    execute: (body: any) => {
      return new Promise(async (resolve, reject) => {
        try {
          let users;
          if (body.type === "null") {
            users = await userRepository.getDataWithProgress();
          } else {
            users = await userRepository.getDataWithProgress(body.type);
          }
          const csvFile = await csvFileGenerationService.generateCsvFile(users);
          resolve(csvFile);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
