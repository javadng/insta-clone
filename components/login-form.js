import { useState } from "react";
import InputForm from "./ui/input-form";
import { signIn } from "next-auth/react";
import LoadingButton from "./ui/loading-btn";
import { useRouter } from "next/router";

const LoginForm = props => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const Router = useRouter();

  const [userguidText, setUserguidText] = useState({
    status: null,
    message: null,
  });

  const passwordValueHandler = inputvalue => {
    setPassword(inputvalue);
  };
  const usernameValueHandler = inputvalue => {
    setUserName(inputvalue);
  };

  const onsubmitHandler = async e => {
    e.preventDefault();

    setUserguidText({ status: null, message: null });

    if (userName.trim().length < 3 || password.trim().length < 8) {
      setUserguidText({
        status: "ERROR",
        message: "Invalid Inputs. don't use auto-complete.",
      });

      return;
    }

    setLoadingState(true);

    const result = await signIn("credentials", {
      redirect: false,
      username: userName,
      password,
    });

    if (result.error) {
      setUserguidText({
        status: "ERROR",
        message: `${result.error}. ${result.status}`,
      });
    }

    if (!result.error) {
      setUserguidText({
        status: "SUCCESS",
        message: "Successfully login.",
      });

      Router.replace("/");
    }

    setLoadingState(false);
  };
  return (
    <form onSubmit={onsubmitHandler} autoComplete="off">
      <InputForm
        inputValue={userName}
        getInputValue={usernameValueHandler}
        type="text"
        className="bg-gray-50 border-gray-100 focus:border-gray-100 transition-all block py-1.5 px-2 my-3 m-auto text-sm w-full rounded-sm"
        placeholder="Phone number, username, or email"
      />
      <InputForm
        inputValue={password}
        getInputValue={passwordValueHandler}
        type="password"
        className="bg-gray-50 border-gray-100 focus:border-gray-100 transition-all block py-1.5 px-2 my-3 m-auto text-sm w-full rounded-sm"
        placeholder="Password"
      />
      <div className="form-row">
        {userguidText.status === "ERROR" && (
          <span className="block text-red-500 text-sm p-3 my-2">
            {userguidText.message}
          </span>
        )}

        {userguidText.status === "SUCCESS" && (
          <span className="block text-green-500 text-sm p-3 my-2">
            {userguidText.message}
          </span>
        )}
      </div>
      <div className="form-row">
        {loadingState && <LoadingButton />}
        {!loadingState && (
          <button className="block bg-blue-400 text-white mx-auto px-2 py-1 w-full my-3">
            Log in
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
