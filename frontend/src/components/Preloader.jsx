import React, { useState, useEffect } from "react";

const Preloader = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show the button after 3 seconds of preloader animation
    setTimeout(() => {
      setShowButton(true);
    }, 2000); // Adjust the time as needed
  }, []);

  const handleButtonClick = () => {
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white opacity-100 transition-opacity duration-1000">
      {/* Phone icon with spinning animation */}
      <div className="w-36 h-64 relative mb-8 animate__animated animate__fadeIn animate__delay-1s">
        <div className="w-full h-full bg-gray-200 rounded-lg shadow-lg animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center animate__animated animate__rotateIn">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-solid rounded-full animate-spin"></div>
        </div>
      </div>

      {/* AppointEasy Button */}
      {showButton && (
        <button
          onClick={handleButtonClick}
          className="mt-6 bg-blue-600 text-white py-3 px-8 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-all animate__animated animate__fadeIn animate__delay-2s"
        >
          AppointEasy
        </button>
      )}
    </div>
  );
};

export default Preloader;
