import { useState } from "react";
import { BiSend } from "react-icons/bi";
import useHttp from "../../hooks/http-hook";

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

  if (props.commentList) {
    const sortedComments = props.commentList.sort((a, b) =>
      a.date > b.date ? -1 : 1
    );

    allCommetns = props.commentList.map(comment => (
      <li className="flex items-center" key={comment.date}>
        <span className="ml-1 text-gray-600">{comment.username}</span>
        <span className="ml-3 text-gray-500">{comment.commentText}</span>
      </li>
    ));
  }

  if (httpState.data && httpState.data.type === "comment") {
    const sortedComments = httpState.data.comments.sort((a, b) =>
      a.date > b.date ? -1 : 1
    );

    allCommetns = httpState.data.comments.map(comment => (
      <li className="flex items-center" key={comment.date}>
        <span className="ml-1 text-gray-600 font-bold">{comment.username}</span>
        :<span className="ml-3 text-gray-500">{comment.commentText}</span>
      </li>
    ));
  }

  return (
    <ul className="comment-list p-4 text-sm md:text-lg">
      <form onSubmit={commentsHandler} className="relative w-1/2 p-2">
        <label htmlFor={props.postId} className="relative">
          <input
            id={props.postId}
            className="comment left-0 absolute border-none w-full outline-none cursor-pointer"
            onChange={getUserCommentValue}
            value={userComment}
          />
          <span className="title transition z-10 relative w-full text-sm cursor-pointer">
            Add new comment ...
          </span>
        </label>
        <button className="btn text-blue-500 absolute -right-3 top-3">
          <BiSend />
        </button>
      </form>
      {allCommetns}
    </ul>
  );
};

export default Comments;
