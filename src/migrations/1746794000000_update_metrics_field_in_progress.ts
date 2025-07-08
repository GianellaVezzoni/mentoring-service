import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mentoring";

const progressSchema = new mongoose.Schema({}, { strict: false });
const Progress = mongoose.model("Progress", progressSchema, "progresses");

async function updateMetricsField() {
  await mongoose.connect(uri);
  const progresses = await Progress.find({});

  for (const doc of progresses) {
    const metrics = (doc as any).metrics;
    if (metrics && !Array.isArray(metrics) && typeof metrics === "object") {
      const metricsArray = Object.entries(metrics).map(
        ([objective, value]) => ({
          objective,
          value,
          date: (doc as any).date || new Date(),
        })
      );
      (doc as any).metrics = metricsArray;
      await doc.save();
      console.log(`Updated Progress ${doc._id}`);
    }
  }
  await mongoose.disconnect();
  console.log(
    "Migration complete: metrics field updated in Progress documents."
  );
}

updateMetricsField().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
