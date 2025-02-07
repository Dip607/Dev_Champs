import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';

const App = () => {
  
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="mx-4 sm:mx-[1%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />

      
      <div className="fixed bottom-10 right-10 z-30">
        <button
          onClick={toggleChatWindow}
          className="flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 text-white p-2 rounded-full shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:shadow-teal-500/50 focus:outline-none"
          aria-label="Chat with us"
        >
          
          <img
            src="src/assets/chatbot.jpeg" 
            alt="Chatbot"
            className="w-20 h-20 rounded-full"
          />
        </button>
      </div>

      
      {isChatOpen && (
        <div className="fixed bottom-20 right-10 z-50 bg-white shadow-lg rounded-lg w-80 p-4 border border-gray-200 transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-xl">Chat with Us</h3>
            <button
              onClick={toggleChatWindow}
              className="text-xl font-bold text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="chat-bubble p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700">Hi! How can I assist you today?</p>
            </div>
            
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Type a message..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
