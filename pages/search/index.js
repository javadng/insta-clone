import Search from "../../components/search";
import useHttp from "../../hooks/http-hook";
import LoadingSpinner from "../../components/ui/loading-spinner";
import Link from "next/link";

const SearchPage = props => {
  const { httpState, sendRequest } = useHttp();

  const searchHandler = async searchValue => {
    await sendRequest(`/api/user-search/${searchValue}`);
  };

  let content = "";

  if (httpState.status === "SUCCESS") {
    content = httpState.data.map(user => (
      <li
        key={user._id}
        className="p-2 font-bold bg-white rounded-lg shadow-sm my-2 capitalize cursor-pointer flex items-center"
      >
        <figure className="w-12 h-12 mr-3 overflow-hidden rounded-full cursor-pointer bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
          <img
            alt="user-profile"
            src={
              user.profile
                ? `data:image/png;base64, ${user.profile}`
                : "/images/story-Image/empty-profile.png"
            }
            className="rounded-full"
          />
        </figure>
        <Link href={`/userprofile/${user.username}`}>{user.username}</Link>
      </li>
    ));
  }

  if (httpState.status === "LOADING") {
    content = <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      <Search getSearchValue={searchHandler} />
      <h2 className="my-3 text-center font-bold">Search result :</h2>
      <ul className="relative">
        {content}
        {httpState.status === "ERROR" && (
          <p className="text-red-500 my-6 text-2xl text-center">
            {httpState.message}
          </p>
        )}
      </ul>
      <Link href="/">
        <span className="text-white bg-blue-500  focus:ring-4 focus:ring-blue-300 font-medium absolute bottom-1 left-1  text-sm px-5 py-2 text-center mr-2  justify-center flex items-center cursor-pointer">
          Return Home
        </span>
      </Link>
    </div>
  );
};

export default SearchPage;
