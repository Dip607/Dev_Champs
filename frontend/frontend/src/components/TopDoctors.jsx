import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='relative flex flex-col items-center px-6 md:px-16 lg:px-24 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
      {/* Section Title */}
      <h1 className='text-5xl font-extrabold mb-3 text-center tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500'>
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
            className='relative overflow-hidden cursor-pointer rounded-xl bg-gradient-to-br from-gray-800 to-gray-600 backdrop-blur-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 p-6 transform shadow-lg hover:shadow-cyan-500/50'
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl"></div>

            {/* Doctor Image */}
            <div className="relative w-full h-56">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Doctor Details */}
            <div className='relative z-10 p-5 flex flex-col gap-3'>
              {/* Availability Toggle UI */}
              <div className='flex items-center justify-between'>
                <span className='text-white font-semibold'>Availability:</span>

                {item.available ? (
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type="checkbox"
                      checked={item.available}
                      readOnly
                      className='sr-only peer'
                    />
                    <div className='w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 peer-checked:after:translate-x-4 peer-checked:after:border-white peer-checked:after:bg-white peer-checked:after:content-[""] peer-checked:after:w-6 peer-checked:after:h-6 peer-checked:after:rounded-full after:bg-white after:border after:border-gray-300 after:transition-all peer-checked:after:transition-all'></div>
                  </label>
                ) : (
                  <span className="text-red-400 font-medium">Not Available</span> // Show "Not Available" message
                )}
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
        className='mt-12 bg-transparent border-2 border-white text-white px-12 py-3 rounded-full text-lg font-semibold backdrop-blur-lg hover:bg-white/20 transition-all duration-300 shadow-md transform hover:scale-110'>
        View More
      </button>
    </div>
  );
}

export default TopDoctors;
