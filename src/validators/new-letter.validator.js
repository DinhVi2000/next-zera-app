import * as yup from "yup";

export const newLetterFormSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("*Please enter your email")
    .email("*Please enter a valid email"),
});
