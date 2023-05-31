import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import "normalize.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import CountryDetail from "./pages/CountryDetail.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
