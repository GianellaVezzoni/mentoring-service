import IUser from "../entities/IUser";

export interface IUserRepository {
    save: (user:IUser) => Promise<IUser>,
    edit: (user:IUser, id:string) => Promise<any>,
    remove:(id:string) => Promise<any>,
    get: (query:any) => Promise<any>,
    getOne: (query:any) => Promise<any>,
    getById: (id:string) => Promise<any>,
}