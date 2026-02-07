import PostDropDown from "./post-dropdown";
import useHttp from "../../hooks/http-hook";
import Comments from "./comment";
import Like from "./like";
import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";

const PostItem = props => {
  const { dataSesstion } = props;

  const postImageSrc = `data:image/png;base64, ${props.postImage}`;

  const { httpState, sendRequest } = useHttp();

  const deleltePostHandler = async () => {
    if (dataSesstion.user.name === props.userName) {
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

  const sortedComments = props.comments.sort((a, b) =>
    a.date > b.date ? -1 : 1
  );
  let commentsList = sortedComments.slice(0, 5);

  const commentDate = new Date(props.date);
  const options = {
    year: "numeric",
    month: "long",
  };
  const formatedDate = new Intl.DateTimeFormat("en-US", options).format(
    commentDate
  );

  return (
    <li className="post-item border-b-2 py-2 bg-white overflow-hidden relative">
      {httpState.status === "LOADING" && (
        <div className="absolute left-0 right-0 top-1/2 z-40 w-full h-full">
          <AiOutlineLoading className="animate-spin relative z-50 text-3xl mx-auto text-blue-800" />
        </div>
      )}
      <div className="user-profile p-1  flex items-center ">
        <figure className="w-12 h-12 overflow-hidden rounded-full cursor-pointer bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
          <Image
            layout="responsive"
            width={100}
            height={100}
            alt="user-profile"
            src={props.profileImage}
            className="rounded-full"
          />
        </figure>
        <span className="font-bold ml-2 cursor-pointer">{props.userName}</span>
        <span className="ml-auto cursor-pointer">
          {dataSesstion.user.name === props.userName && (
            <PostDropDown
              loadingState={httpState.status}
              onDeleltePost={deleltePostHandler}
            />
          )}
        </span>
      </div>
      <figure className="w-full relative">
        <Image
          layout="responsive"
          width={100}
          height={100}
          src={postImageSrc}
          alt="user-post"
          className={`object-cover w-full h-full ${
            httpState.status === "LOADING" ? "-z-40 relative" : ""
          }`}
        />
      </figure>
      <Like
        usernameSession={dataSesstion.user.name}
        usernamePost={props.userName}
        postId={props.id}
        likes={props.likes}
      />
      {props.description && (
        <div className="description p-2">{props.description}</div>
      )}
      <div className="comments">
        <Comments
          postId={props.id}
          usernameSession={dataSesstion.user.name}
          usernamePost={props.userName}
          commentList={commentsList}
        />
        <span className="text-xs md:text-sm truncate">{formatedDate}</span>
      </div>
    </li>
  );
};

export default PostItem;
