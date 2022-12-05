import { IUserRepository } from "../repository/IMongoUserRepository";
import { UserNotExistException } from "../exceptions/UserNotExistException";
import { isObjectIdOrHexString } from "mongoose";
import { InvalidIdException } from "../exceptions/InvalidIdException";

export interface IRemoveUserAction {
    execute: (id:string) => Promise<any>
}

export const RemoveUserAction = (UserRepository: IUserRepository):IRemoveUserAction => {
    return {
        execute(id) {
            return new Promise(async (resolve, reject) => {
                try {
                  if(!isObjectIdOrHexString(id)) throw new InvalidIdException()
                  const user = await UserRepository.getById(id)
                  if (!user) throw new UserNotExistException()
                  await UserRepository.remove(id)
                  resolve(user)
                } catch (error) {
                  reject(error)
                }
              })
        },
    }
}