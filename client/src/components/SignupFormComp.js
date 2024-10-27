import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { SignupButton, StyledInput } from "../styles/stylesSignupPage";
import { signupSchema } from "../schemas/index";
import { useNavigate } from "react-router-dom";
import { Label } from "../styles/stylesSignupPage";

function SignupFormComp() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/signup`,

        values
      );

      actions.resetForm();
      navigate("/login");
    } catch (error) {
      console.error("Signup error", error);
      if (error.response && error.response.status === 400) {
        actions.setErrors({ submit: "Email already exists" });
      } else {
        actions.setErrors({
          submit: "An unexpected error occurred. Please try again later.",
        });
      }
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik({
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
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="form-group">
        <Label htmlFor="familyName">Family Name</Label>
        <StyledInput
          id="familyName"
          type="text"
          {...formik.getFieldProps("familyName")}
          className={
            formik.touched.familyName && formik.errors.familyName
              ? "input-error"
              : ""
          }
          placeholder="Enter family name"
        />
        {formik.touched.familyName && formik.errors.familyName && (
          <p className="error">{formik.errors.familyName}</p>
        )}
      </div>
      {/* Given Name Field */}
      <div className="form-group">
        <Label htmlFor="givenName">Given Name</Label>
        <StyledInput
          id="givenName"
          type="text"
          {...formik.getFieldProps("givenName")}
          className={`form-control ${
            formik.touched.givenName && formik.errors.givenName
              ? "input-error"
              : ""
          }`}
          placeholder="Enter given name"
        />
        {formik.touched.givenName && formik.errors.givenName && (
          <p className="error">{formik.errors.givenName}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="form-group">
        <Label htmlFor="email">Email address</Label>
        <StyledInput
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          className={`form-control ${
            formik.touched.email && formik.errors.email ? "input-error" : ""
          }`}
          placeholder="Enter email"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="form-group">
        <Label htmlFor="password">Password</Label>
        <StyledInput
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          className={`form-control ${
            formik.touched.password && formik.errors.password
              ? "input-error"
              : ""
          }`}
          placeholder="Enter password"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="form-group">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <StyledInput
          id="confirmPassword"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          className={`form-control ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "input-error"
              : ""
          }`}
          placeholder="Confirm password"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="error">{formik.errors.confirmPassword}</p>
        )}
      </div>

      {/* Submit Button */}
      <SignupButton
        disabled={formik.isSubmitting}
        type="submit"
        className="btn btn-primary"
      >
        Sign Up
      </SignupButton>
      {formik.errors.submit && <p className="error">{formik.errors.submit}</p>}
    </form>
  );
}

export default SignupFormComp;
