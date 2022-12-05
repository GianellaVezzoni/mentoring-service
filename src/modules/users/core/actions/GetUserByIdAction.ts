import { isObjectIdOrHexString } from "mongoose";
import { InvalidIdException } from "../exceptions/InvalidIdException";
import { UserNotExistException } from "../exceptions/UserNotExistException";
import { IUserRepository } from "../repository/IMongoUserRepository";
export interface IGetUserByIdAction {
    execute: (id:string) => Promise<any>
}
export const GetUserByIdAction = (UserRepository: IUserRepository):IGetUserByIdAction => {
    return {
        execute(id) {
          return new Promise(async (resolve, reject) => {
            try {
              if(!isObjectIdOrHexString(id)) throw new InvalidIdException()
              const user = await UserRepository.getById(id)
              if(!user) throw new UserNotExistException()
              resolve(user)
            } catch (error) {
              reject(error)
            }
          })
        },
    }
}