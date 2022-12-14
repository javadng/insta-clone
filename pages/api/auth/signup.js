import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, userName, fullName, password } = req.body.data;

    const username = userName.toLowerCase();
    const userEmail = email.toLowerCase();
    const name = fullName.toLowerCase();

    if (
      !userEmail ||
      !userEmail.includes("@") ||
      password.trim().length < 8 ||
      !password
    ) {
      res.status(422).json({
        stauts: "ERROR",
        message:
          "Invalid input - password should also be at least 8 characters long.",
      });
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const userEmailExisted = await db
      .collection("users")
      .findOne({ userEmail: userEmail });

    const usernameExisted = await db
      .collection("users")
      .findOne({ username: username });

    if (userEmailExisted) {
      res
        .status(423)
        .json({ status: "ERROR", message: "This userEmail already existed." });
      client.close();

      return;
    }

    if (usernameExisted) {
      res
        .status(423)
        .json({ status: "ERROR", message: "This userName already taken." });
      client.close();

      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      username,
      userEmail,
      hashedPassword,
      name,
    });

    const userAccount = await db.collection("users-account").insertOne({
      username,
      name,
      followers: [],
      followings: [],
      posts: [],
      stories: [],
    });

    res
      .status(201)
      .json({ status: "SUCCESS", message: "User created. You can login now." });
    client.close();
  }
}
export default handler;
