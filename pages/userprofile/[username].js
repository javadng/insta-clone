import { useEffect } from "react";
import MobileNavigation from "../../components/mobile-nav";
import LoadingSpinner from "../../components/ui/loading-spinner";
import UserProfileSearch from "../../components/user-profilepage";
import useHttp from "../../hooks/http-hook";

const UserProfileFindPage = props => {
  const { sendRequest, httpState } = useHttp();
  let userProfileContent = "";

  useEffect(() => {
    sendRequest(`/api/user/user-account/${props.username}`);
  }, [sendRequest, props.username]);

  console.log(httpState);
  if (httpState.status === "SUCCESS" && httpState.data) {
    userProfileContent = (
      <UserProfileSearch
        profile={httpState.data.userProfile}
        name={httpState.data.name}
        username={props.username}
        posts={httpState.data.posts}
        followers={httpState.data.followers}
        followings={httpState.data.followings}
      />
    );
  }

  return (
    <div>
      {httpState.status === "LOADING" && <LoadingSpinner />}
      {userProfileContent}
      <MobileNavigation userProfile={httpState.data?.userProfile} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { username } = context.query;

  return {
    props: {
      username,
    },
  };
}

export default UserProfileFindPage;
