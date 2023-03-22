import * as yup from "yup";

export const resetPasswordFormSchema = yup.object({
  password: yup
    .string()
    .required("*Please enter your password")
    .min(6, "*At least 6 characters")
    .max(15, "*Must be less than 15 characters long")
    .matches(/[A-Z]/, "*At least 1 uppercase letter")
    .matches(/[a-z]/, "*At least 1 lowercase letter")
    .matches(/[0-9]/, "*At least 1 number"),
  rePassword: yup
    .string()
    .required("*Please enter your password")
    .min(6, "*At least 6 characters")
    .max(15, "*Must be less than 15 characters long")
    .matches(/[A-Z]/, "*At least 1 uppercase letter")
    .matches(/[a-z]/, "*At least 1 lowercase letter")
    .matches(/[0-9]/, "*At least 1 number")
    .oneOf([yup.ref("password"), null], "*Password does not match"),
});
