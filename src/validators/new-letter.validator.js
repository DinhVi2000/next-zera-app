import * as yup from "yup";

export const newLetterFormSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("*Please enter your email")
    .email("*Please enter a valid email")
    .max(30, "*Must be less than 30 characters long"),
  name: yup
    .string()
    .trim()
    .required("*Please enter your name")
    .max(15, "*Must be less than 30 characters long"),
});
