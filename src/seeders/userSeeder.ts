import { MongoUserRepository } from "../modules/users/infrastructure/repository/MongoUserRepository";
import { BcryptHashService } from "../modules/users/infrastructure/services/BcryptHashService";
import { SaveUserAction } from "../modules/users/core/actions/SaveUserAction";
import { MongoProgressRepository } from "../modules/progress/infrastructure/repository/MongoProgressRepository";

const seedGenericUser = async () => {
  try {
    const userRepository = MongoUserRepository();
    const hashService = BcryptHashService();
    const progressRepository = MongoProgressRepository();
    const saveUserAction = SaveUserAction(
      userRepository,
      hashService,
      progressRepository
    );

    const genericUser = {
      name: "Generic User",
      email: "gianella.vezzoni@possumus.tech",
      password: "123456",
      role: "SUPER_ADMIN_ROLE",
      status: true,
      objectives: [],
    };

    const result = await saveUserAction.execute(genericUser);
  } catch (error) {
    console.error("Error creating generic user:", error);
  }
};

export default seedGenericUser;
