import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 🚀 Import useNavigate
import InputField from '../components/InputField';

const SignIn = () => {
  const navigate = useNavigate(); // ✅ Init
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      setSuccess('Login successful!');
      console.log('Logged in user:', res.data.user);

      // ✅ Redirect to /home
      navigate('/home');
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      console.error("Login error:", err);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="login-container">
        <h2 className="form-title">Log in with</h2>
        <p className="separator"><span></span></p>
        <form onSubmit={handleSubmit} className="login-form">
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

          <a href="#" className="forgot-password-link">Forgot password?</a>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="signup-prompt">
          Don&apos;t have an account? <a href="/signup" className="signup-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
