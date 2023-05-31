import { useEffect, useState } from "react";

import "./Navbar.scss";
import React from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex">
          <h1 className="title">Where in the world?</h1>
          <div className="darkMode" onClick={toggleDarkMode}>
            <span className="icon">&#9789;</span>
            <span className="text">Dark Mode</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
