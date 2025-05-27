import { DependencyManager } from "../dependencyManager";
import { MongoUserRepository } from "../modules/users/infrastructure/repository/MongoUserRepository";
import { BcryptHashService } from "../modules/users/infrastructure/services/BcryptHashService";
import { SaveUserAction } from "../modules/users/core/actions/SaveUserAction";

const seedGenericUser = async () => {
  try {
    const userRepository = MongoUserRepository();
    const hashService = BcryptHashService();
    const saveUserAction = SaveUserAction(userRepository, hashService);

    const genericUser = {
      name: "Generic User",
      email: "mail@test.com",
      password: "123456",
      role: "ADMIN_ROLE",
      status: true,
    };

    const result = await saveUserAction.execute(genericUser);
  } catch (error) {
    console.error("Error creating generic user:", error);
  }
};

export default seedGenericUser;
