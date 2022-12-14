import { findUser } from "../../../lib/api-lib";

async function handler(req, res) {
  if (req.method === "GET") {
    const username = req.query.username;

    if (!username) {
      res.status(404).json({ message: "username is wrong!" });
      return;
    }

    let clientGlobal;
    try {
      let { user, client } = await findUser(username, "users-account");
      const userPosts = user.posts;

      clientGlobal = client;

      res.status(200).json({
        data: { userPosts, profile: user.userProfile },
        message: "Success",
      });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }

    clientGlobal.close();
    return;
  }
}

export default handler;
