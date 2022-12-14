import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";
const AccountHeader = props => {
  const router = useRouter();

  const redirectHandler = () => {
    router.push("/auth");
  };

  return (
    <div
      onClick={redirectHandler}
      className="flex items-center justify-end sm:text-2xl font-bold col-start-2 sm:col-start-3 row-start-1"
    >
      <FaHome
        width="3rem"
        height="3rem"
        className="hover:scale-125 transition  cursor-pointer"
      />
      <span className="block ml-3  cursor-pointer">Sign in</span>
    </div>
  );
};

export default AccountHeader;
