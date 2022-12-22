import { unstable_getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import AddUserProfile from "../../components/add-userprofile";
import MobileNavigation from "../../components/mobile-nav";
import Navigation from "../../components/nav";
import PostsList from "../../components/post/posts-list";
import LoadingSpinner from "../../components/ui/loading-spinner";
import Modal from "../../components/ui/modal";
import useHttp from "../../hooks/http-hook";
import { authOptions } from "../api/auth/[...nextauth]";

const UserProfilePage = props => {
  const { httpState, sendRequest } = useHttp();
  const [modalState, setModalState] = useState(false);
  const [isChanged, setIsChange] = useState(false);

  const { sessionData } = props;

  const userLogoutHandler = () => {
    signOut();
  };

  useEffect(() => {
    sendRequest(`/api/user/user-account/${sessionData.user.name}`);
  }, [sendRequest, sessionData]);

  useEffect(() => {
    if (isChanged) {
      sendRequest(`/api/user/user-account/${sessionData.user.name}`);
      setIsChange(false);
    }
  }, [isChanged]);

  if (httpState.status === "LOADING" || !httpState.status) {
    return <LoadingSpinner />;
  }

  const { followers, followings, name, posts, userProfile, username } =
    httpState.data;

  const userProfileImg = userProfile
    ? `data:image/png;base64, ${userProfile}`
    : "/images/story-Image/empty-profile.png";

  return (
    <Fragment>
      {modalState && (
        <Modal modalState={modalState} setModalState={setModalState}>
          <AddUserProfile
            setModalState={setModalState}
            username={sessionData.user.name}
            isChangedFn={setIsChange}
          />
        </Modal>
      )}
      <div className="account-detail bg-gray-50 p-5 relative col-start-2">
        <FiLogOut
          className="text-3xl absolute right-0 top-4 cursor-pointer"
          onClick={userLogoutHandler}
        />

        <div className="grid grid-cols-[6rem_1fr]  justify-evenly items-center my-2 border-b-2 pb-5">
          <figure className="text-center sm:row-start-1 sm:col-start-1 relative">
            <img
              src={userProfileImg}
              className="w-16 h-16 rounded-full"
              alt="userProfile"
            />
            <span className="mt-2 block">{name}</span>
            <span
              onClick={() => setModalState(true)}
              className="block absolute bottom-6 text-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] text-stone-50 cursor-pointer rounded-full"
            >
              <AiFillPlusCircle className="" />
            </span>
          </figure>
          <div className="col-start-2 sm:w-4/5 sm:text-sm text-xs my-6">
            <div className="flex items-center my-4 justify-evenly">
              <span>UserName</span>
              <button className="bg-gray-200  hover:bg-gray-300 font-medium rounded-lg  px-2 py-1.5  text-center dark:bg-gray-300 dark:hover:bg-gray-300">
                Edit Account
              </button>
              <MdOutlineSettings className="text-xl  md:text-4xl" />
            </div>
            <div className="flex justify-evenly">
              <div className="flex flex-col items-center sm:row-start-1 sm:col-start-2">
                <span className="font-bold">{posts.length}</span>
                <span>Posts</span>
              </div>
              <div className="flex flex-col items-center sm:row-start-1 sm:col-start-3">
                <span className="font-bold">{followers.length}</span>
                <span>Follower</span>
              </div>
              <div className="flex flex-col items-center sm:row-start-1 sm:col-start-4">
                <span className="font-bold">{followings.length}</span>
                <span>Following</span>
              </div>
            </div>
          </div>
        </div>

        <PostsList
          userSessionPosts={posts}
          isChanged={setIsChange}
          dataSesstion={sessionData}
        />
      </div>
      <Navigation
        isChanged={setIsChange}
        userName={username}
        userProfile={userProfile}
      />
      {/* <MobileNavigation isChanged={setIsChange} userProfile={userProfile} /> */}
    </Fragment>
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

export default UserProfilePage;
