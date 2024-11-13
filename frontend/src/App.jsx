import { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Person from "./components/Person";
import Demo from "./components/Demo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ComplaintForm from "./pages/ComplaintForm";
import JokesPage from "./pages/JokesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupPage from "./pages/SignupPage";
import ProductView from "./pages/ProductView";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        {/* <Demo number="1" />
        <Demo number="2" />
        <Demo number="3" /> */}
        {/* <Person empl="Nihal" salary="200000" age="23"></Person> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <StorePage />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contactus" element={<ComplaintForm />} />
          <Route path="/jokes" element={<JokesPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
