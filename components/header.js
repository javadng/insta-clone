import { useRouter } from "next/router";
import AccountHeader from "./account-header";
import Search from "./search";
import Logo from "./ui/Logo";
import UserProfile from "./user-profile";

const Header = props => {
  const { name } = props.userSession;
  const router = useRouter();

  const onSearchHandler = inputSearch => {
    router.push("/search");
  };

  return (
    <header className="sm:h-20 h-auto bg-white w-full hidden md:block">
      <div className="grid grid-cols-2 grid-rows-[50px] gap-y-4 sm:grid-cols-3 max-w-7xl mx-4 xl:mx-auto p-5 items-center ">
        <Logo />
        <Search getSearchValue={onSearchHandler} />
        {!name && <AccountHeader />}
        {name && <UserProfile username={name} userImage={props.profile} />}
      </div>
    </header>
  );
};

export default Header;
