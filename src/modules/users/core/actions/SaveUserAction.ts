import { IProgressRepository } from "../../../progress/core/repository/IMongoProgressRepository";
import IUser from "../entities/IUser";
import { IUserRepository } from "../repository/IMongoUserRepository";
import { IHashService } from "../services/IHashService";

export interface ISaveUserAction {
  execute: (body: IUser) => Promise<any>;
}

export const SaveUserAction = (
  UserRepository: IUserRepository,
  hashService: IHashService,
  progressRepository: IProgressRepository
): ISaveUserAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const user = {
            ...body,
          };
          if (body.role !== "USER_ROLE") {
            user.password = hashService.hash(body?.password || "");
          }
          const result = await UserRepository.save(user);
          if (body?.objectives && body?.objectives?.length > 0) {
            await progressRepository.save({
              userId: result._id,
              description: "Objetivos iniciales",
              metrics: body.objectives.map((objective) => ({
                objective,
                value: 0,
                date: new Date(),
              })),
            });
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
