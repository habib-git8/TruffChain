import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route

import SignUp from './Pages/SignUp'; // Import SignUp component
import SignIn from './Pages/SignIn';
import HomePage from './Pages/HomePage';
import MarketSection from './Pages/MarketSection';
import 'flowbite';



function App() {
  return (
    <div className="">
      <Routes> {/* Wrap Routes with Routes component */}
        <Route path="/" element={<HomePage />} /> {/* Home component for '/' */}
        <Route path="/signin" element={<SignIn />} /> {/* SignUp component for '/signup' */}
        <Route path="/signup" element={<SignUp />} /> {/* SignIn component for '/signin' */}
        <Route path="/market" element={<MarketSection  />} /> {/* SignIn component for '/signin' */}
      </Routes>
    </div>
  );
}

export default App;
