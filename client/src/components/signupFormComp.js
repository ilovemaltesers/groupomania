import React from "react";
import { useFormik } from "formik";
import axios from "axios"; // Import axios for HTTP requests
import { SignupButton } from "../styles/stylesSignupPage";
import { signupSchema } from "../schemas/index";

const onSubmit = async (values, actions) => {
  try {
    // Axios POST request
    const response = await axios.post(
      "http://localhost:3000/api/user/signup",
      values
    );
    console.log("Signup successful", response.data);
    actions.resetForm();
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === 400) {
        actions.setErrors({ submit: "Email already exists" });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      console.log(
        "Something else went wrong we can't explain to you right now!",
        error.message
      );
    }
    actions.setSubmitting(false);
  }
};

function SignupFormComp() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      familyName: "",
      givenName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit,
  });

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
            className={`form-control ${
              errors.familyName && touched.familyName ? "input-error" : ""
            }`}
            id="familyName"
            placeholder="Enter family name"
          />
          {errors.familyName && touched.familyName && (
            <p className="error">{errors.familyName}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="givenName">Given Name</label>
          <input
            value={values.givenName}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className={`form-control ${
              errors.givenName && touched.givenName ? "input-error" : ""
            }`}
            id="givenName"
            placeholder="Enter given name"
          />
          {errors.givenName && touched.givenName && (
            <p className="error">{errors.givenName}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            className={`form-control ${
              errors.email && touched.email ? "input-error" : ""
            }`}
            id="email"
            placeholder="Enter email"
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            className={`form-control ${
              errors.password && touched.password ? "input-error" : ""
            }`}
            id="password"
            placeholder="Enter password"
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            className={`form-control ${
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }`}
            id="confirmPassword"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <SignupButton
          disabled={isSubmitting}
          type="submit"
          className="btn btn-primary"
        >
          Sign Up
        </SignupButton>
        {errors.submit && <p className="error">{errors.submit}</p>}{" "}
        {/* Display server-side submission error */}
      </form>
    </>
  );
}

export default SignupFormComp;
