import { HiHome, HiSearch } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Fragment, useEffect, useState } from "react";
import Modal from "./ui/modal";
import AddNewPost from "./addnewpost";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { createPortal } from "react-dom";

const MobileNavigation = props => {
  const [modalState, setModalState] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const { data } = useSession();

  // if (!data) {
  //   return <LoadingSpinner />;
  // }

  useEffect(() => {
    setIsBrowser(true);
  }, [setIsBrowser]);

  if (isBrowser) {
    const userProfileImg = props.userProfile
      ? `data:image/png;base64, ${props.userProfile}`
      : "/images/story-Image/empty-profile.png";

    const liClasses = "cursor-pointer";
    const mobileMenu = (
      <Fragment>
        {modalState && (
          <Modal modalState={modalState} setModalState={setModalState}>
            <AddNewPost
              setModalState={setModalState}
              username={data.user.name}
            />
          </Modal>
        )}
        <div className="md:hidden fixed w-[100vw] bottom-0 left-0 h-12 p-2 bg-white">
          <ul className="flex justify-around items-center text-3xl">
            <Link href="/">
              <li className={liClasses}>
                <HiHome />
              </li>
            </Link>
            <Link href="/search">
              <li className={liClasses}>
                <HiSearch />
              </li>
            </Link>
            <li className={liClasses} onClick={() => setModalState(true)}>
              <BsFillPlusCircleFill />
            </li>
            <li className={liClasses}>
              <AiOutlineHeart />
            </li>
            <Link href="/userprofile">
              <li className={liClasses}>
                <figure className="w-6 h-6 rounded-full overflow-hidden">
                  <img src={userProfileImg} alt="userProfile" />
                </figure>
              </li>
            </Link>
          </ul>
        </div>
      </Fragment>
    );

    return createPortal(mobileMenu, document.getElementById("mobile-nav"));
  } else {
    return null;
  }
};

export default MobileNavigation;
