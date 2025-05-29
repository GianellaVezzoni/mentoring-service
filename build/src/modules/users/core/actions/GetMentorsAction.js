"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMentorsAction = void 0;
const GetMentorsAction = (UserRepository) => {
    return {
        execute: async () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const mentors = await UserRepository.getMentors();
                    resolve(mentors);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetMentorsAction = GetMentorsAction;
