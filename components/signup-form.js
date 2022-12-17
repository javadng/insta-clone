import { useState } from "react";
import useHttp from "../hooks/http-hook";
import InputForm from "./ui/input-form";
import LoadingButton from "./ui/loading-btn";

const SignUpForm = props => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const [userguidText, setUserguidText] = useState({
    status: null,
    message: null,
  });

  const userNameValueHandler = inputvalue => {
    setUserName(inputvalue);
  };
  const passwordValueHandler = inputvalue => {
    setPassword(inputvalue);
  };
  const emailValueHandler = inputvalue => {
    setEmail(inputvalue);
  };
  const fullNameValueHandler = inputvalue => {
    setFullName(inputvalue);
  };

  const signupHandler = async e => {
    e.preventDefault();

    setUserguidText({ status: null, message: null });

    if (
      !email ||
      !email.includes("@") ||
      !password.trim().length > 8 ||
      !password
    ) {
      setUserguidText({
        status: "ERROR",
        message:
          "Invalid input - password should also be at least 8 characters long.",
      });
      return;
    }

    try {
      setLoadingState(true);
      
      const res = await fetch("api/auth/signup", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ data: { email, password, fullName, userName } }),
      });

      const result = await res.json();

      setUserguidText({
        status: result.status,
        message: result.message,
      });
    } catch (error) {
      setUserguidText({
        status: "ERROR!",
        message: error.message,
      });
    }

    setLoadingState(false);
    // setUserName("");
    // setEmail("");
    // setPassword("");
    // setFullName("");
  };

  return (
    <form onSubmit={signupHandler}>
      <InputForm
        inputValue={email}
        getInputValue={emailValueHandler}
        type="text"
        className="bg-gray-50 border-gray-100 focus:border-gray-100 transition-all block py-1.5 px-2 my-3 m-auto text-sm w-full rounded-sm"
        placeholder="Your Email"
      />
      <InputForm
        inputValue={fullName}
        getInputValue={fullNameValueHandler}
        type="text"
        className="bg-gray-50 border-gray-100 focus:border-gray-100 transition-all block py-1.5 px-2 my-3 m-auto text-sm w-full rounded-sm"
        placeholder="Full name"
      />
      <InputForm
        inputValue={userName}
        getInputValue={userNameValueHandler}
        type="text"
        className="bg-gray-50 border-gray-100 focus:border-gray-100 transition-all block py-1.5 px-2 my-3 m-auto text-sm w-full rounded-sm"
        placeholder="Username"
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
            Sign up
          </button>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
