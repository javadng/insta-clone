import { unstable_getServerSession } from "next-auth";
import { findUser } from "../../lib/api-lib";
import { authOptions } from "./auth/[...nextauth]";

async function handler(req, res) {
  if (req.method === "POST") {
    const { postId, username } = req.body;

    if (!postId || !username) {
      res.status(400).json({ massage: "Data is wrong!" });
      return;
    }

    const userSession = await unstable_getServerSession(req, res, authOptions);

    if (userSession.user.name !== username) {
      res.status(500).json({ message: "You can't delete somebody else post." });
      return;
    }

    let clientGlobal;

    try {
      const { user, client, collection } = await findUser(
        username,
        "users-account"
      );
      clientGlobal = client;

      const userDeletedPosts = user.posts.filter(post => post.id !== postId);

      const result = await collection.updateOne(
        { username: username },
        { $set: { posts: userDeletedPosts } }
      );

      res.status(200).json({ message: "Success", data: result });
    } catch (error) {
      res.status(422).json({ message: "ERROR! cannout connect to database." });
    }

    clientGlobal.close();
    return;
  }
}

export default handler;
