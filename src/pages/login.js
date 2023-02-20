import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logo.png";

import LoginForm from "@/components/form/LoginForm";
import GoogleLoginButton from "@/components/sso/GoogleLoginButton";
import FacebookLoginButton from "@/components/sso/FacebookLoginButton";
import FormLoading from "@/components/loading/FormLoading";

const Login = () => {
  const [isSSOLogging, setIsSSOLogging] = useState(false);

  return (
    <div className="flex-center min-h-[100vh] ">
      <div className="bg-[#000000b3] rounded-[30px] px-[60px] pt-5 pb-12 relative overflow-hidden">
        <div>
          <Image src={logo} alt="logo" className="mx-auto"></Image>
        </div>
        <LoginForm onSetIsSSOLogging={setIsSSOLogging} />

        <p className="text-center my-[10px] text-white">or sign in with</p>
        <div className="grid grid-cols-2 gap-5">
          <GoogleLoginButton onSetIsSSOLogging={setIsSSOLogging} />
          <FacebookLoginButton onSetIsSSOLogging={setIsSSOLogging} />
        </div>

        <div className="text-white text-center mt-4">
          No account yet?
          <Link className="ml-1 text-violet-300" href={"/register"}>
            Register now!
          </Link>
        </div>

        {/* bg loading */}
        <FormLoading isLoading={isSSOLogging} />
      </div>
    </div>
  );
};

export default Login;
