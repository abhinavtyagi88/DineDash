import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LogIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://dinedash-64ou.onrender.com/api/login", formData);
      const { authToken } = response.data;
      localStorage.setItem("token", authToken);
      localStorage.setItem("userEmail", formData.email);
      setMessage("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "12px" }}>
        <h2 className="bold-black text-center mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {message && <p className="mt-3 text-center text-danger">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default LogIn;
