import * as yup from "yup";

export const createPlaylistFormSchema = yup.object({
  name: yup
    .string()
    .required("*Please enter name playlist!")
    .min(5, "*At least 5 characters!")
    .max(20, "*At most 20 characters!"),
});
