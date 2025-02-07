import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='fixed  w-full bg-gray-900 text-white py-4 border-b border-gray-700 shadow-md z-50'>
      <div className='flex items-center justify-between max-w-7xl mx-auto px-5'>

        
        

       
        <ul className='md:flex items-start gap-5 font-medium hidden'>
          {['/', '/doctors', '/about', '/contact'].map((path, index) => (
            <NavLink key={index} to={path} className='relative group'>
              <li className='py-1 text-gray-400 hover:text-white transition-all duration-300'>
                {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
              </li>
              <hr className='border-none outline-none h-0.5 bg-gray-500 w-3/5 m-auto opacity-0 group-hover:opacity-100 transition-all duration-300' />
            </NavLink>
          ))}
        </ul>

        
        <div className='flex items-center gap-4'>
          {token && userData ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full border border-gray-500' src={userData.image} alt="User" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
              <div className='absolute top-10 right-0 text-base font-medium text-gray-400 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-800 rounded flex flex-col gap-4 p-4 shadow-lg'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-white cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-white cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-white cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className='bg-gray-700 text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-gray-600 transition-all duration-300'>
              Create account
            </button>
          )}

          
          <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="Menu" />

          
          <div className={`md:hidden fixed top-0 right-0 bottom-0 z-50 bg-gray-900 text-white transition-all duration-300 ${showMenu ? 'w-full' : 'w-0 overflow-hidden'}`}>
            <div className='flex items-center justify-between px-5 py-6'>
              <img src={assets.logo} className='w-36' alt="Logo" />
              <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="Close" />
            </div>
            <ul className='flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium'>
              {['/', '/doctors', '/about', '/contact'].map((path, index) => (
                <NavLink key={index} onClick={() => setShowMenu(false)} to={path} className='px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 w-full text-center'>
                  {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
