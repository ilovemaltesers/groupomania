import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginButton } from "../styles/stylesLoginPage";
import { loginSchema } from "../schemas/index";
import { useAuth } from "../contexts/AuthContext";
import { Label, StyledInput, StyledError } from "../styles/stylesLoginPage";
import { useEffect } from "react";

const LoginFormComp = () => {
  const navigate = useNavigate();
  const { login, auth } = useAuth(); // Get login and auth from context

  // Log auth state when it changes
  useEffect(() => {
    if (auth) {
    }
  }, [auth]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,

        {
          email: values.email,
          password: values.password,
        }
      );

      // Destructure the response
      const { token, userId, givenName, familyName, email, profilePicture } =
        response.data;

      login(token, userId, givenName, familyName, email, profilePicture);

      alert("Login successful");
      navigate("/feed");
    } catch (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.response?.data || error.message}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema, // Validation schema using Yup
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Form inputs for email and password */}
      <div className="form-group">
        <Label htmlFor="email">Email address</Label>
        <StyledInput
          id="email"
          name="email"
          type="email"
          className={`form-control ${
            formik.errors.email && formik.touched.email ? "input-error" : ""
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Enter email"
        />
        {formik.errors.email && formik.touched.email && (
          <StyledError>{formik.errors.email}</StyledError>
        )}
      </div>
      <div className="form-group">
        <Label htmlFor="password">Password</Label>
        <StyledInput
          id="password"
          name="password"
          type="password"
          className={`form-control ${
            formik.errors.password && formik.touched.password
              ? "input-error"
              : ""
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter password"
        />
        {formik.errors.password && formik.touched.password && (
          <StyledError>{formik.errors.password}</StyledError>
        )}
      </div>
      {/* Login button */}
      <LoginButton type="submit" className="btn btn-primary">
        Login
      </LoginButton>
    </form>
  );
};

export default LoginFormComp;
