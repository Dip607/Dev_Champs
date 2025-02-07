import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='relative flex flex-col md:flex-row items-center justify-between bg-gray-900 text-white  px-6 md:px-16 lg:px-24 py-16 '>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>

        
        <div>
         
          <p className='w-full md:w-2/3 text-gray-400 leading-6'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

       
        <div>
          <p className='text-xl font-medium mb-5 text-gray-300'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-400'>
            <li className='hover:text-white transition-all duration-300 cursor-pointer'>Home</li>
            <li className='hover:text-white transition-all duration-300 cursor-pointer'>About us</li>
            <li className='hover:text-white transition-all duration-300 cursor-pointer'>Delivery</li>
            <li className='hover:text-white transition-all duration-300 cursor-pointer'>Privacy policy</li>
          </ul>
        </div>

       
        <div>
          <p className='text-xl font-medium mb-5 text-gray-300'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-400'>
            <li className='hover:text-white transition-all duration-300 cursor-pointer'>+918388846108</li>
            <li className='hover:text-white transition-all duration-300 cursor-pointer'>dipanmandal@gmail.com</li>
          </ul>
        </div>

      </div>

     
      <div>
        <hr className='border-gray-700' />
        <p className='py-5 text-sm text-center text-gray-400'>
          Copyright 2024 @ AppointEasy - All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer
