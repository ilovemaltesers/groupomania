import React from "react";
import { useFormik } from "formik";
import { SignupButton } from "../styles/stylesSignupPage";
import { signupSchema } from "../schemas/index";

const onSubmit = () => {
  console.log("submitted");
};

function SignupFormComp() {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      familyName: "",
      givenName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: onSubmit,
  });

  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label htmlFor="familyName">Family Name</label>
          <input
            value={values.familyName}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className="form-control"
            id="familyName"
            placeholder="Enter family name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="givenName">Given Name</label>
          <input
            value={values.givenName}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className="form-control"
            id="givenName"
            placeholder="Enter given name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={values.confirmPassword}
            onChange={handleChange}
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm password"
          />
        </div>
        <SignupButton type="submit" className="btn btn-primary">
          Sign Up
        </SignupButton>
      </form>
    </>
  );
}

export default SignupFormComp;
