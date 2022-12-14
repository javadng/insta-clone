import { findUser } from "../../../lib/api-lib";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "bad request." });
    return;
  }

  const { usernameSession, usernameToFollow } = req.body.data;

  if (usernameSession === usernameToFollow) {
    res.status(201).json({ message: "You can't follow YourSelf.😂😂" });
    return;
  }

  const sessionUserLower = usernameSession.toLowerCase();
  const followUserLower = usernameToFollow.toLowerCase();

  const { user, client, collection } = await findUser(
    sessionUserLower,
    "users-account"
  );

  // add username to followers of usernameToFollwe
  try {
    const userExisted = user.followings.find(
      user => user.username === followUserLower
    );

    // for unfollow
    if (userExisted) {
      // remove from folliwings
      const userSessionFollowings = user.followings.filter(
        user => user.username !== followUserLower
      );

      try {
        await collection.findOneAndUpdate(
          { username: sessionUserLower },
          {
            $set: {
              followings: userSessionFollowings,
            },
          }
        );

        // remove from follwers of userToFollow
        const userToUnfollow = await collection.findOne({
          username: followUserLower,
        });

        const userFollowers = user.followers.filter(
          user => user.username !== sessionUserLower
        );

        await collection.findOneAndUpdate(
          { username: followUserLower },
          {
            $set: {
              followers: userFollowers,
            },
          }
        );

        const userToUnfollowRequest = await collection.findOne({
          username: followUserLower,
        });

        res
          .status(200)
          .json({ message: "unfollow done.", data: userToUnfollowRequest });
        client.close();
        return;
      } catch (error) {
        res.status(400).json({
          message: error.message || "Somthing went wrong.",
        });
        client.close();
        return;
      }
    }

    user.followings.push({ username: followUserLower });

    const result = await collection.findOneAndUpdate(
      { username: sessionUserLower },
      { $set: { followings: user.followings } }
    );
  } catch (error) {
    res.status(401).json({ message: error.message || "Somthing went wrong." });
    client?.close();
    return;
  }

  // add userTofollow to following of username
  try {
    const user = await collection.findOne({ username: followUserLower });
    if (!user) throw new Error("User notFound!");

    user.followers.push({ username: sessionUserLower });

    const result = await collection.findOneAndUpdate(
      { username: followUserLower },
      { $set: { followers: user.followers } }
    );
    res.status(200).json({ message: "follow done.", data: user });
  } catch (error) {
    res.status(401).json({ message: error.message || "Somthing went wrong." });
    client.close();
    return;
  }

  client.close();
  return;
}

export default handler;
