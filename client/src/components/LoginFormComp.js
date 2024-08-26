import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginButton } from "../styles/stylesLoginPage";
import { loginSchema } from "../schemas/index";
import { useAuth } from "../contexts/AuthContext";

const LoginFormComp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      // Log the full API response for debugging
      console.log("Full API Response:", response.data);

      const { token, userId, givenName, familyName, email, profilePicture } =
        response.data;
      login(token, userId, givenName, familyName, email, profilePicture);

      alert("Login successful");
      navigate("/feed"); // Redirect to feed page on successful login
    } catch (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.response.data}`);
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
        <label htmlFor="email">Email address</label>
        <input
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
          <p className="error">{formik.errors.email}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
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
          <p className="error">{formik.errors.password}</p>
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
