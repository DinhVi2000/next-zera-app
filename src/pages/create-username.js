import React, { Fragment } from "react";

import CreateUsernameForm from "@/components/form/CreateUsernameForm";
import SEO from "@/components/other/SEO";
import ChangePasswordContainer from "@/components/container/ChangePasswordContainer";

const CreateUsername = () => {
  return (
    <Fragment>
      <SEO title="Create username" />
      <ChangePasswordContainer title="Create username">
        <CreateUsernameForm />
      </ChangePasswordContainer>
    </Fragment>
  );
};

export default CreateUsername;
