import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen w-64 bg-gray-900 text-white shadow-xl p-4">
      <h2 className="text-xl font-semibold text-center mb-6">My Menu</h2>
      {aToken && (
        <ul className="space-y-2">
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <img className="w-6" src={assets.home_icon} alt='' />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <img className="w-6" src={assets.appointment_icon} alt='' />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <img className="w-6" src={assets.add_icon} alt='' />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <img className="w-6" src={assets.people_icon} alt='' />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="space-y-2">
          <NavLink
            to={'/doctor-dashboard'}
            className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <img className="w-6" src={assets.home_icon} alt='' />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={'/doctor-appointments'}
            className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <img className="w-6" src={assets.appointment_icon} alt='' />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={'/doctor-profile'}
            className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <img className="w-6" src={assets.people_icon} alt='' />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
