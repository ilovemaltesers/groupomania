import React from "react";
import { LoginButton } from "../styles/stylesLoginPage";
import { useFormik } from "formik"; // Removed unused Formik import
import { loginSchema } from "../schemas/index";

const LoginFormComp = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* Fixed placement of onSubmit */}
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
      <LoginButton type="submit" className="btn btn-primary">
        Login
      </LoginButton>
    </form>
  );
};

export default LoginFormComp;
