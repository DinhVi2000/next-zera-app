import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import ChangePasswordContainer from "@/components/container/ChangePasswordContainer";
import ResetPaswordForm from "@/components/form/ResetPaswordForm";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";

import { isValidPath } from "@/utils/helper";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { query } = router ?? {};

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (isValidPath(query, setIsValidPage)) setIsValidPage(!!query.token);
  }, [query]);

  return (
    <HandleNotFoundPage isValidPage={isValidPage}>
      <ChangePasswordContainer title={"Reset password"}>
        <ResetPaswordForm />
      </ChangePasswordContainer>
    </HandleNotFoundPage>
  );
};

export default ForgotPasswordPage;
