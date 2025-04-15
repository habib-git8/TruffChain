import React from 'react';
import Navbar from '../components/Navbar';
import { ArrowRightIcon } from 'lucide-react'; // Assuming you're using lucide-react
import { Link } from 'react-router-dom'; // If using react-router for routing// Replace with actual button import or your UI lib
import Benefits from '../components/Benefits';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="home-page px-4 md:px-12">
        <main className="wrapper container flex items-center justify-between gap-4 bg-gradient-to-r from-white via-blue-200 to-white py-20">
          <div className="space-y-4 text-left">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-[#424242] lg:text-5xl">
              Start <span className="text-primary">Booking </span>
              Smarter Today
            </h1>
            <h4 className="scroll-m-20 text-lg font-medium tracking-tight text-gray-600">
              Sign up for Availly and experience effortless scheduling
            </h4>
            <button className="group gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-lg flex items-center hover:bg-blue-700 transition">
              <Link to="/market" className="flex items-center gap-2">
                <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                Get Started
              </Link>
            </button>

          </div>
          
        </main>
      </div>
      <Benefits />
    </div>

  );
};

export default HomePage;
