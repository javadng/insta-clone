import Image from "next/image";
import { useState } from "react";
import LoginForm from "../components/login-form";
import SignUpForm from "../components/signup-form";

const LogingPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignUpHandler = () => {
    setIsSignIn(prevState => !prevState);
  };

  return (
    <div className="col-start-1 col-span-2 w-full sm:w-2/3 md:w-[40%] m-auto text-center my-10">
      <div className="py-3 px-[5vw] bg-white shadow-around">
        <figure className="w-full h-20 my-10 relative">
          <Image
            src="/instagram.png"
            layout="fill"
            alt="instagram"
            style={{ objectFit: "fill", width: "100%" }}
          />
        </figure>
        {isSignIn && <LoginForm />}
        {!isSignIn && <SignUpForm />}
      </div>
      <div className="py-6 px-[5vw] my-4 bg-white shadow-around">
        <span>
          {isSignIn && "Don't have an account? "}
          {!isSignIn && "Do you have an account? "}
          <b
            className="text-blue-400 cursor-pointer"
            onClick={toggleSignUpHandler}
          >
            {isSignIn && "Sign up"}
            {!isSignIn && "Sign in"}
          </b>
        </span>
      </div>
    </div>
  );
};

export default LogingPage;
