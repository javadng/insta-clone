import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://javadng3424:XbKmR3KhOLQcJpM8@cluster0.xjei2ko.mongodb.net/?appName=Cluster0"
    // "mongodb://127.0.0.1:27017/insta-clone"
  );
  return client;
};
