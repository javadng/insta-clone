import { BsBookmark } from "react-icons/bs";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import PostDropDown from "./post-dropdown";
import useHttp from "../../hooks/http-hook";
import LoadingSpinner from "../../components/ui/loading-spinner";
import { useSession } from "next-auth/react";
const PostItem = props => {
  const postImageSrc = `data:image/png;base64, ${props.postImage}`;

  const { data } = useSession();
  const { httpState, sendRequest } = useHttp();

  const deleltePostHandler = async () => {
    if (data.user.name === props.userName) {
      const httpOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: props.id, username: props.userName }),
      };
      await sendRequest("/api/delete-post/", httpOptions);

      props.isChanged(true);
    } else {
      console.log("username not match");
    }
  };

  const likeHandler = async () => {
    const httpOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: props.id,
        usernamePost: props.userName,
        usernameLiker: data.user.name,
      }),
    };

    await sendRequest("/api/like", httpOptions);
  };

  let isLiked = props.likes.some(user => user.username === data.user.name);
  let likesNumber = props.likes.length;

  if (httpState.data && httpState.data.likes) {
    isLiked = httpState.data.likes.some(
      user => user.username === data.user.name
    );

    likesNumber = httpState.data.likes.length;
  }

  return (
    <li className="post-item border-b-2 py-1 bg-white overflow-hidden">
      {httpState.status === "LOADING" && (
        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-25">
          <LoadingSpinner className="top-1/2 z-50" />
        </div>
      )}
      <div className="user-profile p-1  flex items-center ">
        <figure className="w-12 h-12 overflow-hidden rounded-full cursor-pointer bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
          <img
            alt="user-profile"
            src={props.profileImage}
            className="rounded-full"
          />
        </figure>
        <span className="font-bold ml-2 cursor-pointer">{props.userName}</span>
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
      <div className="text-2xl sm:text-3xl flex items-center p-3">
        {!isLiked && (
          <AiOutlineHeart
            onClick={likeHandler}
            className="text-3xl sm:text-4xl cursor-pointer"
          />
        )}
        {isLiked && (
          <AiTwotoneHeart
            onClick={likeHandler}
            className=" text-red-600 text-3xl sm:text-4xl cursor-pointer"
          />
        )}
        <FaRegComment className="ml-3 cursor-pointer" />
        <BsBookmark className="ml-auto cursor-pointer" />
      </div>
      {likesNumber !== 0 && (
        <p className="px-4 mr-auto text-left text-xl font-bold self-start">
          {likesNumber} likes
        </p>
      )}
      <div className="description p-4">{props.description}</div>
      <div className="comments">
        <span className="ml-4 block mb-1 text-sm cursor-pointer text-gray-400">
          Add new comment ...
        </span>
        <ul className="comment-list p-4 text-sm md:text-lg">
          <li className="flex items-center">
            <figure className="w-4 h-4 overflow-hidden rounded-full">
              <img src={props.profileImage} alt="" />
            </figure>
            <span className="ml-1 text-gray-600">username</span>
            <span className="ml-3 text-gray-500">comment text</span>
          </li>
          <li className="flex items-center">
            <figure className="w-4 h-4 overflow-hidden rounded-full">
              <img src={props.profileImage} alt="" />
            </figure>
            <span className="ml-1 text-gray-600">username</span>
            <span className="ml-3 text-gray-500">comment text</span>
          </li>
          <li className="flex items-center">
            <figure className="w-4 h-4 overflow-hidden rounded-full">
              <img src={props.profileImage} alt="" />
            </figure>
            <span className="ml-1 text-gray-600">username</span>
            <span className="ml-3 text-gray-500">comment text</span>
          </li>
          <li className="flex items-center">
            <figure className="w-4 h-4 overflow-hidden rounded-full">
              <img src={props.profileImage} alt="" />
            </figure>
            <span className="ml-1 text-gray-600">username</span>
            <span className="ml-3 text-gray-500">comment text</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default PostItem;
