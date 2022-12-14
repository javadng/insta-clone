import AccountHeader from "./account-header";
import Search from "./search";
import Logo from "./ui/Logo";
import UserProfile from "./user-profile";

const Header = props => {
  const { name } = props.userSession;

  return (
    <header className="sm:h-20 h-auto bg-white w-full hidden md:block">
      <div className="grid grid-cols-2 grid-rows-[50px] gap-y-4 sm:grid-cols-3 max-w-7xl mx-4 xl:mx-auto p-5 items-center ">
        <Logo />
        <Search />
        {!name && <AccountHeader />}
        {name && (
          <UserProfile
            username={name}
            followers={0}
            userImage="/images/story-image/image-2.jfif"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
