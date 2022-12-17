import { findUser } from "../../lib/api-lib";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "Bad request" });
    return;
  }

  const { postId, usernamePost, usernameLiker } = req.body;

  if (!postId || !usernamePost || !usernameLiker) {
    res.status(500).json({ message: "Bad request" });
    return;
  }

  let globalClient;

  try {
    const { user, client, collection } = await findUser(
      usernamePost,
      "users-account"
    );

    globalClient = client;

    const userPost = user.posts.find(post => post.id === postId);

    const userExisted = userPost.likes.find(
      user => user.username === usernameLiker
    );

    if (userExisted) {
      userPost.likes = userPost.likes.filter(
        user => user.username !== usernameLiker
      );
    } else {
      userPost.likes.push({ username: usernameLiker });
    }

    await collection.findOneAndUpdate(
      { username: usernamePost },
      { $set: { posts: user.posts } }
    );
    res.status(200).json({ message: "done.", data: userPost.likes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

  globalClient.close();
  return;
}

export default handler;
