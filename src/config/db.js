import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

mongoose.connection.once('open', async () => {
  console.log(">>> Connected to DB:", mongoose.connection.name);

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log(">>> Collections:", collections.map(c => c.name));

  const rawCount = await mongoose.connection.db
    .collection('articles')
    .countDocuments()
    .catch(e => console.log("RAW COUNT ERROR:", e));

  console.log(">>> Raw articles count:", rawCount);
});
