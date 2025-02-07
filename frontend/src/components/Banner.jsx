import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-gray-900 text-white  px-6 md:px-16 lg:px-24 py-16 ">
      
      
      <div className="absolute inset-0 backdrop-blur-lg bg-gray-900 rounded-xl border border-white/10"></div>

      <div className="relative flex-1 text-center md:text-left z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight drop-shadow-md">
          Easy Appointment
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2 font-light">
          Book advance with Easy Appointment
        </p>
        <button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className="bg-white/10 text-white px-6 py-2 rounded-full mt-5 transition-all hover:bg-white/20 hover:backdrop-blur-md shadow-md border border-white/20 text-sm"
        >
          Get Started
        </button>
      </div>

      
      <div className="relative hidden md:flex md:w-1/3 lg:w-[250px] justify-end z-10">
        <img
          className="w-full max-w-sm object-contain drop-shadow-xl opacity-90"
          src={assets.appointment_img}
          alt="Bike"
        />
      </div>
    </div>
  );
};

export default Banner;
