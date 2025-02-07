import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-extrabold text-gray-900">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
            APPOINT
          </span>
          <span className="bg-gradient-to-r from-green-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg">
            EASY
          </span>
        </h1>
        <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
          {aToken ? 'Admin' : 'Doctor'}
        </span>
      </div>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-5 py-2 rounded-full transition-all shadow-md"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
