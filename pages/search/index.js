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
      <li key={user._id} className="p-2 font-bold capitalize cursor-pointer">
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
      <h2 className="my-3 text-center">Search result :</h2>
      <ul className="relative">
        {content}
        {httpState.status === "ERROR" && (
          <p className="text-red-500 my-6 text-2xl text-center">
            {httpState.message}
          </p>
        )}
      </ul>
      <Link href="/" className="text-center">
        Return Home
      </Link>
    </div>
  );
};

export default SearchPage;
