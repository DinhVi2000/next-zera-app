import React from "react";

import ChangePasswordContainer from "@/components/container/ChangePasswordContainer";
import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <ChangePasswordContainer title={"Forgot password"}>
      <ForgotPasswordForm />
    </ChangePasswordContainer>
  );
};

export default ForgotPasswordPage;
