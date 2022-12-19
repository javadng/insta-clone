import PostItem from "./post-item";

const PostsList = props => {
  if (!props.posts || !props.posts?.length) {
    return (
      <h3 className="text-gray-600 text-center my-32 capitalize">
        There is no Post.
      </h3>
    );
  }

  const { posts } = props;

  const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  const postsItems = sortedPosts.map(item => {
    const base64Profile = item.profile
      ? `data:image/png;base64, ${item.profile}`
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
