import * as Yup from "yup";

export const ProfileUpdateSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  picture: Yup.string().test(
    "is-url-or-base64",
    "Invalid URL or base64 data",
    (value) => {
      if (!value) return true; // Allow empty values

      // Check if value is a valid URL
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "(([a-zA-Z0-9$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+)+" + // domain
          "(\\/[a-zA-Z0-9$-_@.&+|\\(\\),%])*$",
        "i"
      );

      // Validate URL
      const isUrl = urlPattern.test(value);

      // Check if value is a base64 encoded string (specifically for images)
      const isBase64 =
        value.startsWith("data:image/") && value.includes(";base64,");

      return isUrl || isBase64;
    }
  ),
});
