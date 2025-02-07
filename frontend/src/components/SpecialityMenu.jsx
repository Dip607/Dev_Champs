import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-10 py-16 bg-gray-900 text-white'>
            <h1 className='text-5xl font-extrabold text-center text-gray-200'>
                Find by Specialty
            </h1>
            <p className='sm:w-2/3 text-center text-xl font-medium text-gray-400'>
                Browse through our curated list of trusted specialists and schedule your appointment with ease.
            </p>
            <div className='flex sm:justify-center gap-10 pt-10 w-full overflow-x-auto'>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className='flex flex-col items-center text-lg font-semibold cursor-pointer flex-shrink-0 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-gray-500/50 p-6 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-md'
                        key={index}
                    >
                        <div className='relative mb-4'>
                            <img
                                className='w-24 sm:w-28 md:w-32 rounded-full shadow-xl border-4 border-gray-600 hover:scale-110 transform transition-all duration-300'
                                src={item.image}
                                alt={item.speciality}
                            />
                        </div>
                        <p className='text-center text-lg text-gray-300'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
