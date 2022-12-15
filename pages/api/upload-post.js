import { unstable_getServerSession } from "next-auth";
import { findUser } from "../../lib/api-lib";
import uniqueId from "../../lib/uniqueid";
import { authOptions } from "./auth/[...nextauth]";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "Format not correct!" });
    return;
  }

  const { description, image, username, date } = req.body.data;

  const userSession = await unstable_getServerSession(req, res, authOptions);

  if (userSession.user.name !== username) {
    res.status(500).json({ message: "upload just for your account is valid." });
    return;
  }

  if (!image) {
    res.status(430).json({ message: "we need Image to be posting." });
    return;
  }

  let clientGlobal;
  try {
    const { user, client, collection } = await findUser(
      username,
      "users-account"
    );
    clientGlobal = client;

    user.posts.push({
      id: uniqueId(),
      description,
      username,
      image,
      date,
      likes: [],
      comments: [],
    });

    const result = await collection.findOneAndUpdate(
      { username: username },
      { $set: { posts: user.posts } }
    );

    res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }

  clientGlobal.close();
  return;
}

export default handler;
