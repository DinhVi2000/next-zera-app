import * as yup from "yup";

export const createUsernameFormSchema = yup.object({
  username: yup
    .string()
    .required("*Please enter your username")
    .min(5, "*At least 5 characters")
    .max(64, "*At most 64 characters")
    .matches(
      /^[a-z0-9_]{5,64}$/,
      "*Please enter a username following the rules below"
    ),
});
