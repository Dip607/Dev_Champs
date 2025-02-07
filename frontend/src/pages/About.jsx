import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-16 py-12">
      
      {/* Section: About Us */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          About <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Learn more about our mission and vision.
        </p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center gap-12">
        <img
          className="w-full md:w-1/3 rounded-lg shadow-lg"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="md:w-2/3 flex flex-col gap-6 text-gray-700 text-lg leading-relaxed">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-blue-600">AppointEasy</span>, your
            trusted partner in managing healthcare needs with convenience and
            efficiency. We understand the challenges of scheduling doctor
            appointments and managing health records.
          </p>
          <p>
            Our platform seamlessly connects patients with trusted healthcare
            providers, ensuring you get the best medical support whenever you
            need it.
          </p>
          <div className="bg-blue-100 p-5 rounded-lg">
            <h2 className="text-xl font-bold text-blue-700">Our Vision</h2>
            <p>
              To create a seamless healthcare experience by bridging the gap
              between patients and healthcare providers. We aim to make
              healthcare accessible, efficient, and stress-free.
            </p>
          </div>
        </div>
      </div>

      {/* Section: Why Choose Us */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800">
          Why <span className="text-blue-600">Choose Us</span>?
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          We prioritize efficiency, convenience, and personalization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        
        {/* Feature Card */}
        <div className="bg-white shadow-md p-8 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800">Efficiency</h3>
          <p className="text-gray-600 mt-2">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>

        {/* Feature Card */}
        <div className="bg-white shadow-md p-8 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800">Convenience</h3>
          <p className="text-gray-600 mt-2">
            Access a network of trusted healthcare professionals in your area.
          </p>
        </div>

        {/* Feature Card */}
        <div className="bg-white shadow-md p-8 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800">Personalization</h3>
          <p className="text-gray-600 mt-2">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>

      </div>

    </div>
  );
};

export default About;
