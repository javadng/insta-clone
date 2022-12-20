import { findUser } from "../../../lib/api-lib";

async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(500).json({ message: "Bad request." });
    return;
  }

  const username = req.query.username;

  if (!username) {
    res.status(404).json({ message: "username is wrong!" });
    return;
  }

  let clientGlobal;

  try {
    let { user, client, collection } = await findUser(
      username,
      "users-account"
    );
    clientGlobal = client;

    let AllPostToShow = [
      { posts: user.posts, profile: user.userProfile, username: user.username },
    ];

    const userFollowings = user.followings.map(item => item.username);

    const findedCursor = await collection.find({
      username: { $in: userFollowings },
    });

    await findedCursor.forEach(user => {
      if (user.posts.length) {
        AllPostToShow.push({
          posts: user.posts,
          profile: user.userProfile,
          username: user.username,
        });
      }
    });

    res.status(200).json({
      data: AllPostToShow,
      message: "Success",
    });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }

  clientGlobal.close();
  return;
}

export default handler;
