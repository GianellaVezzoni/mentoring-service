import { IUserRepository } from "../../core/repository/IMongoUserRepository";
import UserModel from "../models/UserModel";
import configs from "../../../../configs";
import ProgressModel from "../../../progress/infrastructure/models/ProgressModel";

export const MongoUserRepository = (): IUserRepository => ({
  async save(user) {
    const newUser = new UserModel(user);
    return await newUser.save();
  },
  async edit(user, id) {
    return await UserModel.findByIdAndUpdate(id, user);
  },
  async remove(id) {
    await ProgressModel.deleteMany({ userId: id });
    return await UserModel.findByIdAndDelete(id);
  },
  async get(query) {
    const {
      page_count = configs.api.default_page_count,
      page_number = 0,
      ...rest
    } = query;
    const total = await UserModel.countDocuments(rest);
    const users = await UserModel.find(rest)
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
    return await UserModel.findById(id).populate("mentorId");
  },
  async getOne(query) {
    return await UserModel.findOne(query);
  },
  async getOneByEmail(email) {
    return await UserModel.findOne({ email });
  },
  async updatePassword(email, hashedPassword) {
    return await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
  },
  async countRoles() {
    const mentees = await UserModel.countDocuments({ role: "USER_ROLE" });
    const mentors = await UserModel.countDocuments({ role: "ADMIN_ROLE" });
    return { mentees, mentors };
  },
  async getDataWithProgress(role?: string) {
    // Build the match condition
    const matchCondition = role ? { role } : {};

    // Use aggregation to get users with their progress data
    const usersWithProgress = await UserModel.aggregate([
      { $match: matchCondition },
      {
        $lookup: {
          from: "progresses", // MongoDB collection name (plural of Progress model)
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
    const mentors = await UserModel.find({
      role: { $in: ["ADMIN_ROLE", "SUPER_ADMIN_ROLE"] },
      status: true,
    });
    return mentors;
  },
  async getMenteesByMentorId(mentorId) {
    return await UserModel.find({ mentorId });
  },
});
