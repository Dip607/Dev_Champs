import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center">Find Your Doctor</h1>
      <p className="text-gray-600 text-center mt-2">Browse through our top specialists.</p>

      <div className="mt-8 flex flex-col sm:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="sm:w-1/4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`py-2 px-4 rounded-lg border border-gray-300 text-sm font-medium transition-all sm:hidden ${
              showFilter ? "bg-blue-600 text-white" : "bg-white text-gray-800"
            }`}
          >
            {showFilter ? "Close Filters" : "Filters"}
          </button>

          <div
            className={`mt-4 flex flex-col gap-3 text-gray-700 bg-white p-5 rounded-lg shadow-lg transition-all ${
              showFilter ? "max-h-screen overflow-y-auto" : "hidden sm:flex"
            }`}
          >
            {specialities.map((spec) => (
              <p
                key={spec}
                onClick={() =>
                  speciality === spec ? navigate("/doctors") : navigate(`/doctors/${spec}`)
                }
                className={`px-5 py-3 rounded-lg cursor-pointer transition-all text-sm font-medium shadow-sm ${
                  speciality === spec
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filterDoc.map((doctor, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
              className="rounded-xl overflow-hidden cursor-pointer bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Improved Image Design */}
              <div className="w-full aspect-[16/9] bg-gray-200">
                <img
                  className="w-full h-full object-cover rounded-t-xl"
                  src={doctor.image}
                  alt={doctor.name}
                />
              </div>

              {/* Doctor Details */}
              <div className="p-5">
                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    doctor.available ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      doctor.available ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                  {doctor.available ? "Available" : "Not Available"}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mt-2">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.speciality}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
