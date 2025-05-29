"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMenteesAction = void 0;
const GetMenteesAction = (UserRepository) => {
    return {
        execute: async (mentorId) => {
            return await UserRepository.getMenteesByMentorId(mentorId);
        },
    };
};
exports.GetMenteesAction = GetMenteesAction;
