import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='relative flex flex-col items-center px-6 md:px-16 lg:px-24 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>

            {/* Section Title */}
            <h1 className='text-5xl font-extrabold mb-3 text-center tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500'>
                Top Doctors to Book
            </h1>
            <p className='sm:w-1/3 text-center text-gray-400 text-lg mb-10'>
                Browse through our carefully selected top doctors and book your appointment effortlessly.
            </p>

            {/* Doctors Grid */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }} 
                        className='relative overflow-hidden cursor-pointer rounded-xl backdrop-blur-xl bg-white/10 shadow-lg border border-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 p-6 transform hover:shadow-cyan-500/50'
                    >
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-xl"></div>

                        {/* Doctor Image */}
                        <div className="relative">
                            <img src={item.image} alt={item.name} />
                        </div>
                        
                        {/* Doctor Details */}
                        <div className='relative z-10 p-5 flex flex-col gap-3'>
                            {/* Availability Badge */}
                            <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${item.available ? 'bg-green-400 text-green-900' : "bg-red-400 text-red-900"}`}>
                                {item.available ? 'Available' : "Not Available"}
                            </div>

                            {/* Doctor Name */}
                            <p className='text-2xl font-semibold text-white'>{item.name}</p>
                            
                            {/* Specialty */}
                            <p className='text-gray-400 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More Button */}
            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} 
                className='mt-12 bg-white/10 text-white px-12 py-3 rounded-full text-lg font-semibold backdrop-blur-lg hover:bg-white/20 transition-all duration-300 shadow-md transform hover:scale-110'
            >
                View More
            </button>
        </div>
    )
}

export default TopDoctors
