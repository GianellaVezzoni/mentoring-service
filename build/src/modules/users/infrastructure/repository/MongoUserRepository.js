"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepository = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const configs_1 = __importDefault(require("../../../../configs"));
const MongoUserRepository = () => ({
    async save(user) {
        const newUser = new UserModel_1.default(user);
        return await newUser.save();
    },
    async edit(user, id) {
        return await UserModel_1.default.findByIdAndUpdate(id, user);
    },
    async remove(id) {
        return await UserModel_1.default.findByIdAndDelete(id);
    },
    async get(query) {
        const { page_count = configs_1.default.api.default_page_count, page_number = 0, ...rest } = query;
        const total = await UserModel_1.default.countDocuments(rest);
        const users = await UserModel_1.default.find(rest)
            .select("-password")
            .limit(Number(page_count))
            .skip(Number(page_number));
        const pagination = {
            total,
            page_number,
            page_count,
            records: users.length,
        };
        return {
            users,
            pagination,
        };
    },
    async getById(id) {
        return await UserModel_1.default.findById(id).populate("mentorId");
    },
    async getOne(query) {
        return await UserModel_1.default.findOne(query);
    },
    async getOneByEmail(email) {
        return await UserModel_1.default.findOne({ email });
    },
    async updatePassword(email, hashedPassword) {
        return await UserModel_1.default.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
    },
    async countRoles() {
        const mentees = await UserModel_1.default.countDocuments({ role: "USER_ROLE" });
        const mentors = await UserModel_1.default.countDocuments({ role: "ADMIN_ROLE" });
        return { mentees, mentors };
    },
    async getDataWithProgress(role) {
        const matchCondition = role ? { role } : {};
        const usersWithProgress = await UserModel_1.default.aggregate([
            { $match: matchCondition },
            {
                $lookup: {
                    from: "progresses",
                    localField: "_id",
                    foreignField: "userId",
                    as: "progress",
                },
            },
            {
                $lookup: {
                    from: "users",
                    let: { mentorId: { $toObjectId: "$mentorId" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$mentorId"] } } },
                        { $project: { password: 0 } },
                    ],
                    as: "mentorInfo",
                },
            },
            {
                $addFields: {
                    mentor: { $arrayElemAt: ["$mentorInfo", 0] },
                    progressSummary: {
                        totalEntries: { $size: "$progress" },
                        totalSessions: { $sum: "$progress.totalSessions" },
                        latestProgress: {
                            $arrayElemAt: [{ $slice: ["$progress", -1] }, 0],
                        },
                    },
                },
            },
            {
                $project: {
                    password: 0,
                    mentorInfo: 0,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
        ]);
        return usersWithProgress;
    },
    async getMentors() {
        const mentors = await UserModel_1.default.find({
            role: { $in: ["ADMIN_ROLE", "SUPER_ADMIN_ROLE"] },
            status: true,
        });
        return mentors;
    },
    async getMenteesByMentorId(mentorId) {
        return await UserModel_1.default.find({ mentorId });
    },
});
exports.MongoUserRepository = MongoUserRepository;
