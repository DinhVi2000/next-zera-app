import React, { Fragment } from "react";

const FormLoading = ({ isLoading }) => {
  return (
    <Fragment>
      {isLoading && (
        <div className="w-full h-full absolute bg-[#00000088] opacity-70 top-0 left-0 flex items-center justify-center">
          <span className="w-10 h-10 border-[5px] border-violet-800 border-t-transparent rounded-full animate-spin"></span>
        </div>
      )}
    </Fragment>
  );
};

export default FormLoading;
