import { findUser } from "../../lib/api-lib";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "Bad request" });
    return;
  }

  const { postId, usernamePost, usernameCommented, commentText } = req.body;

  if (!postId || !usernamePost || !usernameCommented || !commentText) {
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

    const currentDate = new Date().toISOString();

    userPost.comments.push({
      username: usernameCommented,
      commentText,
      date: currentDate,
    });

    await collection.findOneAndUpdate(
      { username: usernamePost },
      { $set: { posts: user.posts } }
    );

    const sortedComments = userPost.comments.sort((a, b) =>
      a.date > b.date ? -1 : 1
    );
    const latestComments = sortedComments.slice(0, 5);

    res.status(200).json({
      message: "done.",
      data: { type: "comment", comments: latestComments },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

  globalClient.close();
  return;
}

export default handler;
