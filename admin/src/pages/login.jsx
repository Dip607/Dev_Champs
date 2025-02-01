import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const url = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
      const { data } = await axios.post(`${backendUrl}${url}`, { email, password });

      if (data.success) {
        state === 'Admin' ? setAToken(data.token) : setDToken(data.token);
        localStorage.setItem(state === 'Admin' ? 'aToken' : 'dToken', data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form 
        onSubmit={onSubmitHandler} 
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-[350px] sm:w-[400px] flex flex-col gap-5"
      >
        <h2 className="text-center text-3xl font-semibold text-gray-800 dark:text-white">
          {state} <span className="text-blue-600">Login</span>
        </h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-600 dark:text-gray-300">Password</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all"
        >
          Login
        </button>

        <p className="text-center text-gray-600 dark:text-gray-300">
          {state === 'Admin' ? 'Doctor' : 'Admin'} Login?{' '}
          <span 
            onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')} 
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
