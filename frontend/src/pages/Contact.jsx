import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-16 py-12">
      
      {/* Section: Contact Us Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Get in touch with us for any inquiries or support.
        </p>
      </div>

      {/* Contact Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
        
        {/* Contact Image */}
        <img
          className="w-full md:w-1/3 rounded-lg shadow-lg"
          src={assets.contact_image}
          alt="Contact Us"
        />

        {/* Contact Information */}
        <div className="md:w-2/3 flex flex-col gap-6 text-gray-700 text-lg leading-relaxed">
          
          {/* Office Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">Our Office</h2>
            <p className="text-gray-600 mt-2">
              Prayagraj <br /> UP,India
            </p>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Tel:</span> (+91) 838884#### <br />
              <span className="font-semibold">Email:</span> appointeasy@gmail.com
            </p>
          </div>

          {/* Careers Section */}
          <div className="bg-blue-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-700">
              Careers at AppointEasy
            </h2>
            <p className="text-gray-600 mt-2">
              Join our team and be part of an innovative healthcare revolution.
            </p>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all">
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-16 bg-white shadow-lg p-8 rounded-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Send Us a Message
        </h2>
        <p className="text-gray-600 text-center mt-2">
          We’d love to hear from you!
        </p>
        <form className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>

    </div>
  );
};

export default Contact;
