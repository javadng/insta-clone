import { useSession } from "next-auth/react";
import { AiOutlineLoading } from "react-icons/ai";
import useHttp from "../hooks/http-hook";
import PostsList from "./post/posts-list";

const UserProfileSearch = props => {
  const { name, posts, profile } = props;
  const { data } = useSession();

  let followers = props.followers;
  let followings = props.followings;

  const { sendRequest, httpState } = useHttp();

  const userProfileImg = profile
    ? `data:image/png;base64, ${profile}`
    : "/images/story-Image/empty-profile.png";

  const sendFollowRequest = async () => {
    const dataToSend = {
      usernameSession: data.user.name,
      usernameToFollow: props.username,
    };

    await sendRequest("/api/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: dataToSend }),
    });
  };

  let followBtnContent;

  if (httpState.status === "SUCCESS" && httpState.data) {
    followers = httpState.data.followers;
    followings = httpState.data.followings;
  }

  if (followers) {
    const isFollowing = followers.some(
      user => user.username === data.user.name
    );

    if (isFollowing) followBtnContent = "Unfollow";
    else followBtnContent = "Follow";
  }

  if (httpState.status === "LOADING") {
    followBtnContent = (
      <AiOutlineLoading className="animate-spin text-lg mx-auto text-blue-400" />
    );
  }

  return (
    <div className="account-detail bg-gray-50 p-5 relative">
      <div className="grid grid-col-4 grid-flow-col grid-rows-2 justify-evenly items-center my-2 border-b-2 pb-5">
        <figure className="text-center sm:row-start-1 sm:col-start-1">
          <img
            src={userProfileImg}
            className="w-16 h-16 rounded-full"
            alt="userProfile"
          />
          <span className="mt-2 block">{name}</span>
        </figure>
        <div className="flex flex-col items-center sm:row-start-1 sm:col-start-2">
          <span>{posts.length}</span>
          <span>Posts</span>
        </div>
        <div className="flex flex-col items-center sm:row-start-1 sm:col-start-3">
          <span>{followers.length}</span>
          <span>Follower</span>
        </div>
        <div className="flex flex-col items-center sm:row-start-1 sm:col-start-4">
          <span>{followings.length}</span>
          <span>Following</span>
        </div>

        <button
          onClick={sendFollowRequest}
          className="col-start-1 col-span-4 sm:col-start-2 sm:col-span-3 row-start-2 w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {followBtnContent}
        </button>
      </div>

      <PostsList posts={posts} profile={profile} />
    </div>
  );
};

export default UserProfileSearch;
