/* eslint-disable react/jsx-no-undef */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../MyCart";
import "./Navbar.css"; // Make sure you create this CSS file

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  let navigate = useNavigate();
  const items = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide navbar on scroll down
      } else {
        setShowNavbar(true); // Show navbar on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${showNavbar ? "visible" : "hidden"}`}>
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">DineDashh</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fs-5 mx-3 active" to="/">Home</Link>
            </li>
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" to="/myorder">My Orders</Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
            </form>
          ) : (
            <div>
              <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                <img src="https://cdn-icons-png.flaticon.com/512/9617/9617053.png" style={{ height: "20px", padding: "3px" }} alt="cart"/>
                <span className="badge cart-badge">{items.length}</span>
              </div>
              {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
              <button onClick={handleLogout} className="btn bg-white text-success">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
