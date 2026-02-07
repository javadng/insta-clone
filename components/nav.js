import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { HiHome, HiSearch } from "react-icons/hi";
import { Fragment, useState } from "react";
import Modal from "./ui/modal";
import AddNewPost from "./addnewpost";
import { useSession } from "next-auth/react";

const Navigation = props => {
  const [modalState, setModalState] = useState(false);

  const { data } = useSession();
  let userProfile,
    userName = "loading";

  if (data) {
    userName = data.user.name;
    userProfile = data.user.image;
  }

  const userProfileImg = userProfile
    ? `data:image/png;base64, ${userProfile}`
    : "/images/story-Image/empty-profile.png";

  const liClasses =
    "cursor-pointer flex items-center text-xl p-3 my-3 md:my-9 w-full";
  const spanClasses = "ml-9 hidden lg:inline-block";
  return (
    <Fragment>
      {modalState && (
        <Modal modalState={modalState} setModalState={setModalState}>
          <AddNewPost
            setModalState={setModalState}
            username={userName}
            // isChanged={props.isChanged}
          />
        </Modal>
      )}
      <div className="fixed left-0 bottom-0 bg-white w-[100vw] md:max-w-[10vw] lg:max-w-[20vw] md:h-[100vh] col-start-1 col-span-4 px-4">
        <ul className="flex md:block text-5xl">
          <Link href="/">
            <li className={liClasses}>
              <HiHome className="absolute text-3xl" />
              <span className={spanClasses}>Home</span>
            </li>
          </Link>
          <Link href="/search">
            <li className={liClasses}>
              <HiSearch className="absolute text-3xl" />
              <span className={spanClasses}>Search</span>
            </li>
          </Link>
          <li className={liClasses} onClick={() => setModalState(true)}>
            <BsFillPlusCircleFill className="absolute text-3xl" />
            <span className={spanClasses}>Create</span>
          </li>
          <Link href="/">
            <li className={liClasses}>
              <AiOutlineHeart className="absolute text-3xl" />
              <span className={spanClasses}>Notifications</span>
            </li>
          </Link>
          <Link href="/userprofile">
            <li className={liClasses}>
              <figure className="w-6 h-6 rounded-full overflow-hidden">
                <img src={userProfileImg} alt="profile-Image" />
              </figure>
              <span className="ml-3 hidden lg:inline-block">Profile</span>
            </li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
};

export default Navigation;
