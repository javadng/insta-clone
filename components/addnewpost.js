import { Fragment, useState } from "react";
import useHttp from "../hooks/http-hook";

const AddNewPost = props => {
  const { httpState, sendRequest } = useHttp();
  const [userImage, setUserImage] = useState("");
  const [userDescription, setUserDescription] = useState("");

  const [errorText, setErrorText] = useState("");

  const getUserImage = e => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      if (e.target.files[0].size > 800000) {
        setErrorText("Error! Image too large. Most be lower than 1Mb.");
        return;
      }

      setErrorText("");

      reader.addEventListener("load", () => {
        //convert to base64 for sending to the database
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        setUserImage(base64String);
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getUserDescription = e => {
    setUserDescription(e.target.value);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    const currentDate = new Date().toISOString();

    const postData = {
      image: userImage,
      description: userDescription,
      username: props.username,
      date: currentDate,
    };

    if (!postData.image) {
      setErrorText("ERROR! image format is wrong");
      return;
    }

    try {
      await sendRequest("/api/upload-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: postData }),
      });

      props.setModalState(false);
      props.isChanged(true);
    } catch (error) {
      setErrorText(error.message || httpState.message);
    }
  };

  return (
    <Fragment>
      {/* <!-- Modal header --> */}
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Upload new post
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
          <textarea
            onChange={getUserDescription}
            type="text"
            cols="2"
            value={userDescription}
            className="block w-full resize-none"
            placeholder="post Description"
          />
        </form>
        {errorText && (
          <span className="text-center text-red-500 font-bold block my-3">
            {errorText}
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
    </Fragment>
  );
};

export default AddNewPost;
