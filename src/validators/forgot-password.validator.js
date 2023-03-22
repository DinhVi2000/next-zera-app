import * as yup from "yup";

export const forgotPasswordFormSchema = yup.object({
  email: yup
    .string()
    .required("*Please enter your email")
    .email("*Please enter a valid email"),
});
