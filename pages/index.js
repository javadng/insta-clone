import { Fragment, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Header from "../components/header";
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

  return (
    <div className="col-start-2">
      <Header userSession={user} profile={httpState.data?.profile} />
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
        <div className="account-detail bg-gray-50 p-5 relative hidden md:block">
          <span className="block mt-6 text-xs lg:text-lg">
            UserName : {user.name}
          </span>
          {user && (
            <FiLogOut
              className="text-3xl absolute right-0 top-4 cursor-pointer"
              onClick={userLogoutHandler}
            />
          )}
        </div>
      </section>

      <Navigation
        isChanged={setIsChanged}
        userName={user.name}
        userProfile={httpState.data?.profile}
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
