import React from "react";
import { SignupButton } from "../styles/stylesSignupPage";

function SignupFormComp() {
  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="familyName">Family Name</label>
          <input
            type="text"
            className="form-control"
            id="familyName"
            placeholder="Enter family name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="givenName">Given Name</label>
          <input
            type="text"
            className="form-control"
            id="givenName"
            placeholder="Enter given name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
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
