import PostItem from "./post-item";

const PostsList = props => {
  if (!props.postsData.posts || !props.postsData.posts?.length) {
    return (
      <h3 className="text-gray-600 text-center my-32 capitalize">
        There is no Post.
      </h3>
    );
  }

  const { postsData, dataSesstion } = props;
  let allPosts = [];

  const userSession = postsData.find(
    item => item.username === dataSesstion.user.name
  );

  allPosts.push(...userSession.posts);

  const followings = postsData.filter(
    item => item.username !== dataSesstion.user.name
  );

  followings.forEach(item => allPosts.push(...item.posts));

  const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
  const postsItems = sortedPosts.map(item => {
    const userProfileImage = postsData.map(
      data => data.username === item.username && data.profile
    );

    const base64Profile = userProfileImage[0]
      ? `data:image/png;base64, ${userProfileImage[0]}`
      : "/images/story-Image/empty-profile.png";

    return (
      <PostItem
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
    <ul className="posts mb-14 grid grid-cols-1 lg:grid-cols-posts gap-3">
      {postsItems}
    </ul>
  );
};

export default PostsList;
