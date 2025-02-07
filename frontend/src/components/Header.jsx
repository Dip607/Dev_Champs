import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className='relative flex flex-col md:flex-row items-center justify-between bg-gray-900 text-white  px-6 md:px-16 lg:px-24 py-16 '>
            <div className="absolute inset-0 bg-grey-900 backdrop-blur-md rounded-lg z-10"></div>

            
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-2 m-auto md:py-[8vw] relative z-20'>
                <p className='text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-md'>
                    Your <span className="text-gray-300">Health</span> Matters, <br className='hidden sm:block' />
                    <span className="text-gray-400">Book Anytime, Anywhere.</span>
                </p>

                <div className='flex flex-col md:flex-row items-center gap-6 text-lg font-medium'>
                    <img className='w-36 md:w-40 lg:w-48 rounded-full shadow-2xl border-4 border-gray-500' src={assets.group_profiles} alt="Trusted Doctors" />
                    <p className='text-center md:text-left opacity-80'>
                        Connect with top healthcare professionals and schedule appointments at your convenience. <br className='hidden sm:block' /> Your health, your schedule.
                    </p>
                </div>

                
                <div className="flex gap-6 mt-6">
                    <a href='#speciality' className='flex items-center gap-4 bg-gray-700 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 hover:bg-gray-600 shadow-lg'>
                        Book Appointment <img className='w-4' src={assets.arrow_icon} alt="Arrow Icon" />
                    </a>
                    <button 
                        onClick={() => setShowVideo(!showVideo)} 
                        className='flex items-center gap-4 bg-transparent border-2 border-gray-500 text-gray-300 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 hover:text-white shadow-md'
                    >
                        {showVideo ? "Close Video" : "Watch Video"} 
                        <img className='w-4' src={assets.arrow_icon} alt="Arrow Icon" />
                    </button>
                </div>
            </div>

            
            <div className='md:w-1/2 relative mt-8 md:mt-0 flex justify-center items-center relative z-20'>
                {showVideo ? (
                    <iframe
                        className='w-full md:w-3/4 h-64 md:h-80 lg:h-96 rounded-lg shadow-2xl transition-all duration-500 opacity-100 scale-100'
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="Appointment Video"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <img className='w-full rounded-lg shadow-2xl border-4 border-gray-600 transition-all duration-500' src={assets.header_img} alt="Doctor Image" />
                )}
            </div>

        </div>
    );
}  

export default Header;
