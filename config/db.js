import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    const dbConnect = await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to DATABASE"))
      .catch((err) =>
        console.log("Couldn't connect to database: " + err.message)
      );
  } catch (error) {
    console.log(error.message);
  }
}

export default connectToDatabase;
