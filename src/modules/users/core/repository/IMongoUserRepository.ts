import IUser from "../entities/IUser";

export interface IUserRepository {
  save: (user: any) => Promise<any>;
  edit: (user: IUser, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  get: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
  countRoles: () => Promise<{ mentees: number; mentors: number }>;
  getDataWithProgress: (role?: string) => Promise<any>;
  getMentors: () => Promise<any>;
  getOneByEmail: (email: string) => Promise<any>;
  updatePassword: (email: string, hashedPassword: string) => Promise<any>;
  getMenteesByMentorId: (mentorId: string) => Promise<any>;
}
