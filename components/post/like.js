import { Fragment } from "react";
import {
  AiOutlineHeart,
  AiOutlineLoading,
  AiTwotoneHeart,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import useHttp from "../../hooks/http-hook";

const Like = props => {
  const { httpState, sendRequest } = useHttp();

  const likeHandler = async () => {
    const httpOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: props.postId,
        usernamePost: props.usernamePost,
        usernameLiker: props.usernameSession,
      }),
    };

    await sendRequest("/api/like", httpOptions);
  };

  let isLiked = props.likes.some(
    user => user.username === props.usernameSession
  );
  let likesNumber = props.likes.length;

  if (httpState.data && httpState.data.likes) {
    isLiked = httpState.data.likes.some(
      user => user.username === props.usernameSession
    );

    likesNumber = httpState.data.likes.length;
  }

  return (
    <Fragment>
      <div className="text-2xl sm:text-3xl flex items-center p-3">
        {httpState.status === "LOADING" && (
          <span className="animate-spin block text-blue-500 text-3xl">
            <AiOutlineLoading />
          </span>
        )}
        {httpState.status !== "LOADING" && !isLiked && (
          <AiOutlineHeart
            onClick={likeHandler}
            className="text-3xl sm:text-4xl cursor-pointer"
          />
        )}
        {httpState.status !== "LOADING" && isLiked && (
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
    </Fragment>
  );
};
export default Like;
