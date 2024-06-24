import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
// one lowercase, one uppercase, one number, at least 6 characters

export const signupSchema = yup.object().shape({
  familyName: yup.string().required("Family name is required"),
  givenName: yup.string().required("Given name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match 🧐")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

// export const createPostSchema = yup.object().shape({
//     title: yup.string().required("Title is required"),
//     content: yup.string().required("Content is required"),
// });
