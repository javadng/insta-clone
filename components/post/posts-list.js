import PostItem from "./post-item";

const PostsList = props => {
  if (!props.posts || !props.posts?.length) {
    return (
      <h3 className="text-gray-600 text-center my-32 capitalize">
        There is no Post.
      </h3>
    );
  }

  const { posts, profile } = props;

  const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  const postsItems = sortedPosts.map(item => (
    <PostItem
      id={item.id}
      key={item.id}
      postImage={item.image}
      profileImage={profile}
      userName={item.username}
      description={item.description}
    />
  ));

  return <ul className="posts mb-14">{postsItems}</ul>;
};

export default PostsList;
