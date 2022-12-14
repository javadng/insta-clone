import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import InputForm from "./ui/input-form";

const Search = props => {
  const [userSearchValue, setUserSearchValue] = useState("");

  const userSearchValueHandler = inputValue => {
    setUserSearchValue(inputValue);
  };

  const onSearchHandler = e => {
    e.preventDefault();

    if (userSearchValue.trim().length <= 2) return;

    props.getSearchValue(userSearchValue.toLowerCase());
  };

  return (
    <div className="col-span-2 sm:col-span-1 relative">
      <form onSubmit={onSearchHandler}>
        <div className="flex items-center">
          <InputForm
            getInputValue={userSearchValueHandler}
            type="text"
            placeholder="Search"
            className="w-full block px-3 rounded-md border-gray-200 focus:border-blue-100 transition"
          />
        </div>
        <button className="absolute z-10 right-2 top-5">
          <BsSearch className="" />
        </button>
        <input type="submit" value="" />
      </form>
    </div>
  );
};

export default Search;
