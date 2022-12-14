import { useState } from "react";
import useHttp from "../hooks/http-hook";

const AddUserProfile = props => {
  const [profileImage, setProfileImage] = useState("");
  const { httpState, sendRequest } = useHttp();

  const getUserImage = e => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.addEventListener("load", () => {
        //convert to base64 for sending to the database
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        setProfileImage(base64String);
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    if (!profileImage) {
      console.log("ERROR! image format is wrong");
      return;
    }

    const data = {
      username: props.username,
      image: profileImage,
    };

    await sendRequest("api/upload-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    props.setModalState(false);
    props.isChangedFn(true);
  };

  return (
    <div>
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Upload new userProfile
        </h3>
      </div>
      {/* <!-- Modal body --> */}
      <div className="p-6 space-y-6">
        <form onSubmit={onSubmitHandler}>
          <input
            onChange={getUserImage}
            type="file"
            className="bg-gray-50 border-gray-100 focus:border-gray-100 transition-all block py-1.5 px-2 my-3 m-auto text-sm w-full rounded-sm"
            accept="image/png, image/gif, image/jpeg"
            placeholder="Upload your image from this post."
          />
        </form>
        {httpState.status === "ERROR" && (
          <span className="text-center text-red-500 font-bold block my-3">
            {httpState.message}
          </span>
        )}
      </div>
      {/* <!-- Modal footer --> */}
      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          data-modal-toggle="defaultModal"
          type="button"
          onClick={onSubmitHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {httpState.status === "LOADING" ? "Sending..." : "Upload"}
        </button>
        <button
          data-modal-toggle="defaultModal"
          type="button"
          onClick={() => props.setModalState(false)}
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddUserProfile;
