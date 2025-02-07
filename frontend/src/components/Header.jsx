import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets'; // Import assets (assuming you have a path for assets)

const Header = () => {
    const [isFormVisible, setIsFormVisible] = useState(false); // Track form visibility
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        photo: null
    });

    const videoRef = useRef(null);

    // Set the video to play automatically once the component is mounted
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input (for photo)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            photo: file
        });
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // You can add more logic to submit the data to a server or API here
        setIsFormVisible(false); // Hide the form after submission
    };

    return (
        <div className='relative flex flex-col md:flex-row items-center justify-between bg-gray-900 text-white px-6 md:px-16 lg:px-24 py-16'>
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

                    {/* Emergency Service Button */}
                    <button 
                        onClick={() => setIsFormVisible(true)} // Show form on button click
                        className='flex items-center gap-4 bg-red-600 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 hover:bg-red-500 shadow-lg'
                    >
                        Emergency Service <img className='w-4' src={assets.arrow_icon} alt="Arrow Icon" />
                    </button>
                </div>
            </div>

            <div className='md:w-1/2 relative mt-8 md:mt-0 flex justify-center items-center relative z-20'>
                <video
                    ref={videoRef} // Reference the video element
                    className='w-full md:w-3/4 h-64 md:h-80 lg:h-96 rounded-lg shadow-2xl transition-all duration-500 opacity-100 scale-100'
                    autoPlay
                    muted={false} // Video will not be muted on autoplay
                    loop
                    controls
                >
                    {/* Replace with the correct path to your video file */}
                    <source src={assets.vid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Floating Form */}
            {isFormVisible && (
                <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg w-80 p-6 border border-gray-200 z-50">
                    <h3 className="text-xl font-semibold mb-4">Emergency Contact Form</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="photo">
                                Photo (Optional)
                            </label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 transition-all"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <button
                        onClick={() => setIsFormVisible(false)} // Close form
                        className="absolute top-2 right-2 text-lg font-bold text-gray-500 hover:text-gray-800"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;
