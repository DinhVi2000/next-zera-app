import * as yup from "yup"

export const updateUserFormSchema = yup.object({
  username: yup
    .string()
    .max(30, "*Must be less than 30 characters long"),
})
