import styled from "styled-components";
import BackgroundImage from "../assets/images/bg-signup.jpg";
import { Link } from "react-router-dom";

const Background = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  margin-left: 70px;
`;

const CenteredButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 20px;
  background-color: #fa8a00;
  border: none;
`;

const AlreadyAccountLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #fa8a00;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignupPage = () => {
  return (
    <Background>
      <SignupBox className="container">
        <h2 className="text-center" style={{ color: "#fa8a00" }}>
          Groupomania
        </h2>
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
          <CenteredButton type="submit" className="btn btn-primary">
            Sign Up
          </CenteredButton>
        </form>
        <AlreadyAccountLink to="/login">
          Already have an account?
        </AlreadyAccountLink>
      </SignupBox>
    </Background>
  );
};

export default SignupPage;

// import { Link } from "react-router-dom";

// EXAMPLE
// import React from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// function HomePage() {
//   return (
//     <div>
//       <Header />
//       <main>
//         <h1>Welcome to the Home Page</h1>
//         {/* Other components and logic for the HomePage */}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default HomePage;
