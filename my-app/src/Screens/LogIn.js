import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:5000/api/login', formData);
  
      console.log('API Response:', response.data); // Log the entire response
  
      const { authToken, user } = response.data; // Assuming the API returns 'authToken'
  
      // Store the authToken and userEmail in localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('userEmail', formData.email);  // Corrected line: use formData.email
      
      console.log("Token saved:", authToken);
  
      setMessage('LogIn successful!');
      navigate('/');  // Redirect to the homepage or dashboard
    } catch (error) {
      setMessage('Error logging in.');
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">LogIn</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">LogIn</button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default LogIn;
