// App.js is the main application component that sets up routing using react-router-dom.
// EXAMPLE
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Header from './components/Header';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';

// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.text()) // <-- Use res.text() instead of res.json()
      .then((data) => {
        console.log(data); // <-- Log the entire data object
        setMessage(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}
