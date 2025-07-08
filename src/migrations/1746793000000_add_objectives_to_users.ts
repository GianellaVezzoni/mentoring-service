import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mentoring";

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model("User", userSchema, "users");

async function addObjectivesField() {
  await mongoose.connect(uri);
  await User.updateMany(
    { objectives: { $exists: false } },
    { $set: { objectives: [] } }
  );
  await mongoose.disconnect();
  console.log("Migration complete: objectives field added to users.");
}

addObjectivesField().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
