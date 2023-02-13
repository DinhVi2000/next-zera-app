import * as yup from "yup";

export const registerFormSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("*Please enter your email")
    .email("*Please enter a valid email"),
  password: yup
    .string()
    .required("*Please enter your password")
    .min(6, "*At least 6 characters"),
});
