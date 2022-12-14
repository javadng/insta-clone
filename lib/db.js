import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    // "mongodb+srv://javadng:joeA8mfzOcNKdPCQ@insta-clone.q06zcpr.mongodb.net/?retryWrites=true&w=majority"
    "mongodb://127.0.0.1:27017/insta-clone"
  );

  return client;
};
