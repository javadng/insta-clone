import { unstable_getServerSession } from "next-auth";
import { findUser } from "../../lib/api-lib";
import { authOptions } from "./auth/[...nextauth]";

async function handler(req, res) {
  if (req.method === "POST") {
    const { image, username } = req.body.data;

    if (!image) {
      res.status(500).json({ message: "Image format is wrong" });
      return;
    }

    const userSession = await unstable_getServerSession(req, res, authOptions);

    if (userSession.user.name !== username) {
      res
        .status(500)
        .json({ message: "upload just for your account is valid." });
      return;
    }

    let clientGlobal;
    try {
      const { client, collection } = await findUser(username, "users-account");
      clientGlobal = client;

      const result = await collection.findOneAndUpdate(
        { username: username },
        { $set: { userProfile: image } }
      );

      res.status(200).json({ message: "Success", data: result });
      client.close();
      return;
    } catch (error) {
      res.status(422).json({ message: error.message });
      clientGlobal.close();
      return;
    }
  } else {
    res.status(500).json({ message: "Wrong request" });
    return;
  }
}

export default handler;
