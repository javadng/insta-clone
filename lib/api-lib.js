import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { connectToDatabase } from "./db";

export const findUser = async (userName, selectedCollection) => {
  try {
    const client = await connectToDatabase();

    if (!client) throw new Error("Error! cannot connect to database.");

    const collection = await client.db().collection(selectedCollection);
    if (!collection) throw new Error("Collection notFound!");

    const user = await collection.findOne({ username: userName });

    if (!user) throw new Error("User notFound!");

    return { user, client, collection };
  } catch (error) {
    throw new Error(error.message || "Somthing went wrong.");
  }
};

export const validateUserSession = async (req, res, username) => {
  const userSession = await unstable_getServerSession(req, res, authOptions);

  let isUserValid;

  if (userSession.user.name === username) {
    isUserValid = true;
  } else {
    isUserValid = false;
  }

  return isUserValid;
};
