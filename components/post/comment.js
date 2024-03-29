import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import useHttp from "../../hooks/http-hook";

const commentGenerator = commentList => {
  return commentList.map(comment => {
    const commentDate = new Date(comment.date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formatedDate = new Intl.DateTimeFormat("en-US", options).format(
      commentDate
    );

    return (
      <li className="flex items-center" key={comment.date}>
        <span className="ml-1 text-gray-600 font-bold">{comment.username}</span>
        :
        <span className="ml-3 text-gray-500 truncate">
          {comment.commentText}
        </span>
        <span className="ml-auto text-xs md:text-sm truncate">
          {formatedDate}
        </span>
      </li>
    );
  });
};

const Comments = props => {
  const { httpState, sendRequest } = useHttp();
  const [userComment, setUserComment] = useState("");

  const getUserCommentValue = e => {
    setUserComment(e.target.value);
  };

  const commentsHandler = async e => {
    e.preventDefault();

    const httpOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: props.postId,
        usernamePost: props.usernamePost,
        usernameCommented: props.usernameSession,
        commentText: userComment,
      }),
    };

    await sendRequest("/api/comments", httpOptions);

    setUserComment("");
  };

  let allCommetns = "";

  if (!httpState.data && props.commentList) {
    allCommetns = commentGenerator(props.commentList);
  }

  if (httpState.data && httpState.data.type === "comment") {
    allCommetns = commentGenerator(httpState.data.comments);
  }

  return (
    <ul className="comment-list p-4 text-sm md:text-lg">
      <form onSubmit={commentsHandler} className="relative md:w-2/3 p-2 mb-8">
        <input
          id={props.postId}
          className="input left-0 absolute bg-gray-50 px-2 py-1  w-full outline-none cursor-pointer"
          onChange={getUserCommentValue}
          value={userComment}
          placeholder="Add new comment"
        />
        <button className="btn text-blue-500 text-xl absolute right-1 top-[11px]">
          {httpState.status !== "LOADING" && <BiSend />}
          {httpState.status === "LOADING" && (
            <span className="animate-spin block">
              <AiOutlineLoading />
            </span>
          )}
        </button>
      </form>
      {httpState.status === "LOADING" && (
        <AiOutlineLoading className="animate-spin text-lg mx-auto text-blue-400" />
      )}

      {httpState.status !== "LOADING" && allCommetns}
    </ul>
  );
};

export default Comments;
