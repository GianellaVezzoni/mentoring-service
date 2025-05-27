import IUser from "../entities/IUser";
import { IUserRepository } from "../repository/IMongoUserRepository";

export interface IGetMentorsAction {
  execute: () => Promise<IUser[]>;
}

export const GetMentorsAction = (
  UserRepository: IUserRepository
): IGetMentorsAction => {
  return {
    execute: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const mentors = await UserRepository.getMentors();
          resolve(mentors);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
