import { Fragment, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import AddNewPost from "./addnewpost";
import Modal from "./ui/modal";

const UserProfile = props => {
  const [modalState, setModalState] = useState(false);

  const userProfileImg = props.userImage
    ? `data:image/png;base64, ${props.userImage}`
    : "/images/story-Image/empty-profile.png";

  return (
    <Fragment>
      {modalState && (
        <Modal modalState={modalState} setModalState={setModalState}>
          <AddNewPost setModalState={setModalState} username={props.username} />
        </Modal>
      )}
      <div className="flex justify-evenly items-start md:w-1/2 mx-auto">
        <figure className="w-14 h-14 row-start-1 col-start-1 rounded-full relative ">
          <img
            src={userProfileImg}
            alt="userprofile"
            className="rounded-full"
          />
          <span
            onClick={() => setModalState(true)}
            className="block absolute right-0 -bottom-2 text-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] text-stone-50 cursor-pointer rounded-full"
          >
            <AiFillPlusCircle className="" />
          </span>
        </figure>
        <div>
          <span className="text-sm text-gray-600 text-left font-bold">
            {props.username}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
