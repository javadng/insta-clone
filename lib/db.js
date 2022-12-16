import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://javadng:70sgBLqnpJqwBdoO@cluster0.mkgnshu.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb://127.0.0.1:27017/insta-clone"
  );

  return client;
};
