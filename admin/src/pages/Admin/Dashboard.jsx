import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className="m-5 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { icon: assets.doctor_icon, label: 'Doctors', value: dashData.doctors },
          { icon: assets.appointments_icon, label: 'Appointments', value: dashData.appointments },
          { icon: assets.patients_icon, label: 'Patients', value: dashData.patients }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <img className="w-16" src={item.icon} alt={item.label} />
            <div>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-lg">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white border-b">
          <img src={assets.list_icon} alt="" className="w-6" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="divide-y">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-center px-6 py-4 gap-4 hover:bg-gray-100 transition">
              <img className="rounded-full w-12 h-12 object-cover" src={item.docData.image} alt={item.docData.name} />
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{item.docData.name}</p>
                <p className="text-gray-600 text-sm">Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-500 text-sm font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-sm font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 cursor-pointer hover:opacity-80"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
