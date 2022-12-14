import { BsBookmark } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import PostDropDown from "./post-dropdown";
import useHttp from "../../hooks/http-hook";
import LoadingSpinner from "../../components/ui/loading-spinner";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
const PostItem = props => {
  const postImageSrc = `data:image/png;base64, ${props.postImage}`;
  const { data } = useSession();
  const { httpState, sendRequest } = useHttp();
  const Router = useRouter();


  const userProfileImg = props.profileImage
    ? `data:image/png;base64, ${props.profileImage}`
    : "/images/story-Image/empty-profile.png";

  const deleltePostHandler = async () => {
    if (data.user.name === props.userName) {
      const httpOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: props.id, username: props.userName }),
      };
      await sendRequest("/api/delete-post/", httpOptions);

      Router.reload();
    } else {
      console.log("username not match");
    }
  };

  return (
    <div className="relative">
      {httpState.status === "LOADING" && (
        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-25">
          <LoadingSpinner className="top-1/2 z-50" />
        </div>
      )}
      <li className="post-item border-b-2 py-3 overflow-hidden">
        <div className="user-profile p-2 flex items-center ">
          <figure className="w-14 h-14 overflow-hidden rounded-full cursor-pointer bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
            <img
              alt="user-profile"
              src={userProfileImg}
              className="rounded-full"
            />
          </figure>
          <span className="font-bold ml-2 cursor-pointer">
            {props.userName}
          </span>
          <span className="ml-auto cursor-pointer">
            {data.user.name === props.userName && (
              <PostDropDown
                loadingState={httpState.status}
                onDeleltePost={deleltePostHandler}
              />
            )}
          </span>
        </div>
        <figure className="w-full relative">
          <img
            src={postImageSrc}
            alt="user-post"
            className={`object-cover w-full h-full ${
              httpState.status === "LOADING" ? "-z-40 relative" : ""
            }`}
          />
        </figure>
        <div className="text-sm sm:text-3xl flex items-center p-3">
          <AiOutlineHeart className="text-4xl cursor-pointer" />
          <FaRegComment className="ml-3 text-3xl cursor-pointer" />
          <BsBookmark className="ml-auto text-3xl cursor-pointer" />
        </div>
        <div className="description p-4">{props.description}</div>
        <div className="comments">
          <span className="ml-4 block mb-1 text-sm cursor-pointer text-gray-400">
            Add new comment ...
          </span>
          <ul className="comment-list p-4">
            <li className="flex items-center">
              <figure className="w-4 h-4 overflow-hidden rounded-full">
                <img src={props.profileImage} alt="" />
              </figure>
              <span className="ml-1 text-gray-600">username</span>
              <span className="ml-3 text-gray-500">comment text</span>
              <span className="date ml-auto">20 hours ago</span>
            </li>
            <li className="flex items-center">
              <figure className="w-4 h-4 overflow-hidden rounded-full">
                <img src={props.profileImage} alt="" />
              </figure>
              <span className="ml-1 text-gray-600">username</span>
              <span className="ml-3 text-gray-500">comment text</span>
              <span className="date ml-auto">20 hours ago</span>
            </li>
            <li className="flex items-center">
              <figure className="w-4 h-4 overflow-hidden rounded-full">
                <img src={props.profileImage} alt="" />
              </figure>
              <span className="ml-1 text-gray-600">username</span>
              <span className="ml-3 text-gray-500">comment text</span>
              <span className="date ml-auto">20 hours ago</span>
            </li>
            <li className="flex items-center">
              <figure className="w-4 h-4 overflow-hidden rounded-full">
                <img src={props.profileImage} alt="" />
              </figure>
              <span className="ml-1 text-gray-600">username</span>
              <span className="ml-3 text-gray-500">comment text</span>
              <span className="date ml-auto">20 hours ago</span>
            </li>
          </ul>
        </div>
      </li>
    </div>
  );
};

export default PostItem;
