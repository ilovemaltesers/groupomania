import React from "react";
import { useFormik } from "formik";
import { SignupButton } from "../styles/stylesSignupPage";
import { signupSchema } from "../schemas/index";

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
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
      </form>
    </>
  );
}

export default SignupFormComp;
