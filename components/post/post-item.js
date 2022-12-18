import PostDropDown from "./post-dropdown";
import useHttp from "../../hooks/http-hook";
import LoadingSpinner from "../../components/ui/loading-spinner";
import Comments from "./comment";
import Like from "./like";
import Image from "next/image";

const PostItem = props => {
  const { dataSesstion } = props;

  const postImageSrc = `data:image/png;base64, ${props.postImage}`;

  const { httpState, sendRequest } = useHttp();

  const deleltePostHandler = async () => {
    if (dataSesstion.name === props.userName) {
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

  return (
    <li className="post-item border-b-2 py-1 bg-white overflow-hidden">
      {httpState.status === "LOADING" && (
        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-25">
          <LoadingSpinner className="top-1/2 z-50" />
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
          {dataSesstion.name === props.userName && (
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
        usernameSession={dataSesstion.name}
        usernamePost={props.userName}
        postId={props.id}
        likes={props.likes}
      />
      <div className="description p-4">{props.description}</div>
      <div className="comments">
        <Comments
          postId={props.id}
          usernameSession={dataSesstion.name}
          usernamePost={props.userName}
          commentList={commentsList}
        />
      </div>
    </li>
  );
};

export default PostItem;
