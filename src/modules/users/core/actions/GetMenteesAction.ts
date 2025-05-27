import IUser from "../entities/IUser";
import { IUserRepository } from "../repository/IMongoUserRepository";

export interface IGetMenteesAction {
  execute: (mentorId: string) => Promise<IUser[]>;
}

export const GetMenteesAction = (
  UserRepository: IUserRepository
): IGetMenteesAction => {
  return {
    execute: async (mentorId: string) => {
      return await UserRepository.getMenteesByMentorId(mentorId);
    },
  };
};
