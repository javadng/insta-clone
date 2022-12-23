import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import PostsList from "../components/post/posts-list";
import StoryList from "../components/story/story-list";
import { FiLogOut } from "react-icons/fi";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import LoadingSpinner from "../components/ui/loading-spinner";
import useHttp from "../hooks/http-hook";
import Navigation from "../components/nav";

const HomePage = props => {
  const { httpState, sendRequest } = useHttp();
  const [isChanged, setIsChanged] = useState(false);

  const { user } = props.sessionData;

  useEffect(() => {
    sendRequest(`/api/home-posts/${user.name}`);
  }, [sendRequest, user]);

  useEffect(() => {
    if (isChanged) {
      sendRequest(`/api/home-posts/${user.name}`);

      setIsChanged(false);
    }
  }, [isChanged]);

  const userLogoutHandler = () => {
    signOut();
  };
  const userProfileImg = user.image
    ? `data:image/png;base64, ${user.image}`
    : "/images/story-Image/empty-profile.png";

  return (
    <div className="col-start-2">
      <section className="grid md:grid-cols-[30rem_1fr] max-w-4xl m-auto  mt-2">
        <div className="posts p-1">
          <StoryList />
          <div className="relative">
            {httpState.status === "LOADING" && <LoadingSpinner />}
            {httpState.status === "SUCCESS" && (
              <PostsList
                isChanged={setIsChanged}
                dataSesstion={props.sessionData}
                postsData={httpState.data}
              />
            )}
          </div>
        </div>
        <ul className="account-detail bg-gray-50 py-2 mt-6 relative hidden md:block">
          {user && (
            <li className="flex items-center bg-white p-2 rounded-md">
              <figure className="w-14 h-14 mr-3 overflow-hidden rounded-full">
                <img src={userProfileImg} alt="" />
              </figure>
              <span className="block text-xs mr-auto font-bold capitalize lg:text-lg">
                {user.name}
              </span>
              <FiLogOut
                className="text-3xl cursor-pointer"
                onClick={userLogoutHandler}
              />
            </li>
          )}
        </ul>
      </section>
      <Navigation
        isChanged={setIsChanged}
        userName={user.name}
        userProfile={userProfileImg}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const sessionData = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!sessionData) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      sessionData,
    },
  };
}
export default HomePage;
