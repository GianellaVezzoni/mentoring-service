"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoUserRepository_1 = require("../modules/users/infrastructure/repository/MongoUserRepository");
const BcryptHashService_1 = require("../modules/users/infrastructure/services/BcryptHashService");
const SaveUserAction_1 = require("../modules/users/core/actions/SaveUserAction");
const seedGenericUser = async () => {
    try {
        const userRepository = (0, MongoUserRepository_1.MongoUserRepository)();
        const hashService = (0, BcryptHashService_1.BcryptHashService)();
        const saveUserAction = (0, SaveUserAction_1.SaveUserAction)(userRepository, hashService);
        const genericUser = {
            name: "Generic User",
            email: "mail@test.com",
            password: "123456",
            role: "ADMIN_ROLE",
            status: true,
        };
        const result = await saveUserAction.execute(genericUser);
    }
    catch (error) {
        console.error("Error creating generic user:", error);
    }
};
exports.default = seedGenericUser;
