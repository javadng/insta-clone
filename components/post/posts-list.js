import PostItem from "./post-item";

const PostsList = props => {
  const { postsData, dataSesstion, userSessionPosts } = props;
  let allPosts = [];

  if (userSessionPosts) {
    allPosts.push(...userSessionPosts);
  } else {
    const userSession = postsData.find(
      item => item.username === dataSesstion.user.name
    );

    allPosts.push(...userSession.posts);

    const followings = postsData.filter(
      item => item.username !== dataSesstion.user.name
    );

    followings.forEach(item => allPosts.push(...item.posts));
  }

  if (!allPosts.length) {
    return (
      <h3 className="text-gray-600 text-center my-32 capitalize">
        There is no Post.
      </h3>
    );
  }
  const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
  const postsItems = sortedPosts.map(item => {
    let userProfileImg;

    if (userSessionPosts) {
      userProfileImg = item.profile;
    } else {
      const userProfile = postsData.map(
        data => data.username === item.username && data.profile
      );

      userProfileImg = userProfile[0];
    }

    const base64Profile = userProfileImg
      ? `data:image/png;base64, ${userProfileImg}`
      : "/images/story-Image/empty-profile.png";

    return (
      <PostItem
        date={item.date}
        likes={item.likes}
        comments={item.comments}
        isChanged={props.isChanged}
        id={item.id}
        key={item.id}
        dataSesstion={props.dataSesstion}
        postImage={item.image}
        profileImage={base64Profile}
        userName={item.username}
        description={item.description}
      />
    );
  });

  return (
    <ul className="posts mb-16 grid grid-cols-1 lg:grid-cols-posts gap-3">
      {postsItems}
    </ul>
  );
};

export default PostsList;
