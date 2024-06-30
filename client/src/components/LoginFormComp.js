import React from "react";
import { LoginButton } from "../styles/stylesLoginPage";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/index";
import axios from "axios";

// Function to handle login
async function login(email, password) {
  try {
    const response = await axios.post("http://localhost:3000/api/user/login", {
      email,
      password,
    });

    const { token } = response.data;
    localStorage.setItem("token", token);
    alert("Login successful");
  } catch (error) {
    alert(`Login failed: ${error.response.data}`);
    throw error;
  }
}

const LoginFormComp = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema, // Validation schema using Yup
      onSubmit: async (values) => {
        try {
          await login(values.email, values.password); // Call login function with form values
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs for email and password */}
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
      {/* Login button */}
      <LoginButton type="submit" className="btn btn-primary">
        Login
      </LoginButton>
    </form>
  );
};

export default LoginFormComp;
