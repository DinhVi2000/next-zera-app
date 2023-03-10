import React from "react";

import CreateUsernameForm from "@/components/form/CreateUsernameForm";
import FormLoading from "@/components/loading/FormLoading";
import SEO from "@/components/other/SEO";

const CreateUsername = () => {
  return (
    <>
      <SEO title={"Create username"} />
      <div className="flex-center min-h-[100vh] ">
        <div className="bg-[#000000b3] rounded-[30px] px-[60px] pt-5 pb-12 relative overflow-hidden w-full max-w-[563px]">
          {/* <div>
          <Image src={logo} alt="logo" className="mx-auto"></Image>
        </div> */}
          <h1 className="text-white text-2xl text-center font-bold ">
            Create username
          </h1>
          <CreateUsernameForm />

          {/* bg loading */}
          <FormLoading />
        </div>
      </div>
    </>
  );
};

export default CreateUsername;
