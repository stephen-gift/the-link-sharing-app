import * as Yup from "yup";

export const ProfileUpdateSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").optional(),
});
