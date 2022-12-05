

import { IUserRepository } from "../../core/repository/IMongoUserRepository"
import UserModel = require("../models/UserModel")
import configs from "../../../../configs"

export const MongoUserRepository = (): IUserRepository => ({
  async save(user) {
    const newUser = new UserModel(user)
    return await newUser.save()
  },
  async edit(user, id) {
    return await UserModel.findByIdAndUpdate(id, user)
  },
  async remove(id) {
    return await UserModel.findByIdAndDelete(id)
  },
  async get(query) {
    const {page_count = configs.api.default_page_count, page_number= 0,...rest} = query
    return await UserModel.find(rest).limit(Number(page_count)).skip(Number(page_number))
  },
  async getById(id) {
    return await UserModel.findById(id)
  },
  async getOne(query) {
    return await UserModel.findOne(query)
  }
})