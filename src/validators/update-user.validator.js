import * as yup from "yup";

export const updateUserFormSchema = yup.object({
  username: yup
    .string()
    .required("*Please enter your username")
    .min(6, "*At least 6 characters")
    .max(64, "*Must be less than 64 characters long")
    .matches(
      /^[a-z0-9_]{5,64}$/,
      "Please enter a valid username according to the rules"
    ),
});
