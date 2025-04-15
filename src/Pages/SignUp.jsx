import React, { useState } from 'react';
import axios from 'axios'; // Import axios to make HTTP requests
import InputField from '../components/InputField';
import SocialLogin from '../components/SocialLogin';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // To show loading state during the API call

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true); // Set loading to true when the API request starts

    try {
      // Make a POST request to your Express backend
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // If the registration is successful, handle the response
      console.log("User registered successfully:", response.data);
      // You can redirect the user to the login page or show a success message
      alert("Registration successful! Please login.");
      window.location.href = '/signin'; // Redirect to login page
    } catch (err) {
      // If there's an error, show it
      console.error("Error during registration:", err);
      setError(err.response ? err.response.data.message : 'Something went wrong.');
    } finally {
      setLoading(false); // Set loading to false when the API request finishes
    }
  };

  return (
    <div className='loginsignup'>
      <div className="login-container">
        <h2 className="form-title">Sign Up with</h2>
        {/* <SocialLogin /> */}
        <p className="separator"><span></span></p>
        <form onSubmit={handleSubmit} className="login-form">
          <InputField 
            type="text" 
            placeholder="Full Name" 
            icon="user" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
          <InputField 
            type="email" 
            placeholder="Email address" 
            icon="mail" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          <InputField 
            type="password" 
            placeholder="Password" 
            icon="lock" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
          />
          <InputField 
            type="password" 
            placeholder="Confirm Password" 
            icon="lock" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="signup-prompt">
          Already have an account? <a href="/signin" className="signup-link">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
