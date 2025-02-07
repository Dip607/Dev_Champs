import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="container mx-auto p-6 bg-gray-900 text-white min-h-screen flex flex-col gap-6">
      {/* Top Section: Overview & Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-400">Total Earnings</p>
          <h2 className="text-3xl font-semibold">{currency} {dashData.earnings}</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-400">Appointments</p>
          <h2 className="text-3xl font-semibold">{dashData.appointments}</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-400">Patients</p>
          <h2 className="text-3xl font-semibold">{dashData.patients}</h2>
        </div>
      </div>
      
      {/* Recent Appointments */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Recent Appointments</h3>
        <div className="divide-y divide-gray-700">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <img className="rounded-full w-12 h-12" src={item.userData.image} alt={item.userData.name} />
                <div>
                  <p className="font-medium">{item.userData.name}</p>
                  <p className="text-gray-400 text-sm">{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>
              <div>
                {item.cancelled ? (
                  <span className="text-red-500">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => cancelAppointment(item._id)} className="px-4 py-2 text-white bg-red-600 rounded-lg">Cancel</button>
                    <button onClick={() => completeAppointment(item._id)} className="px-4 py-2 text-white bg-green-600 rounded-lg">Complete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
