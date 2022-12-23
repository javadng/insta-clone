import { unstable_getServerSession } from "next-auth";
import { useEffect } from "react";
import Navigation from "../../components/nav";
import LoadingSpinner from "../../components/ui/loading-spinner";
import UserProfileSearch from "../../components/user-profilepage";
import useHttp from "../../hooks/http-hook";
import { authOptions } from "../api/auth/[...nextauth]";

const UserProfileFindPage = props => {
  const { sendRequest, httpState } = useHttp();
  let userProfileContent = "";

  const { user } = props.sessionData;

  const userProfileImage = `data:image/png;base64, ${user.image}`;

  useEffect(() => {
    sendRequest(`/api/user/user-account/${props.username}`);
  }, [sendRequest, props.username]);

  if (httpState.status === "SUCCESS" && httpState.data) {
    userProfileContent = (
      <UserProfileSearch
        profile={httpState.data.userProfile}
        name={httpState.data.name}
        username={props.username}
        dataSesstion={props.sessionData}
        posts={httpState.data.posts}
        followers={httpState.data.followers}
        followings={httpState.data.followings}
      />
    );
  }

  return (
    <div className="col-start-2">
      {httpState.status === "LOADING" && <LoadingSpinner />}
      {userProfileContent}
      <Navigation userName={user.name} userProfile={userProfileImage} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { username } = context.query;

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
      username,
      sessionData,
    },
  };
}

export default UserProfileFindPage;
