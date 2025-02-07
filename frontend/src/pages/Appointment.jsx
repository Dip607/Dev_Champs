import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0) {
            const doc = doctors.find((doc) => doc._id === docId);
            setDocInfo(doc);
        }
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);

    const getAvailableSlots = async () => {
        setLoading(true);
        setDocSlots([]);

        let today = new Date();
        let slotsArray = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let timeSlots = [];
            let startTime = i === 0 ? Math.max(today.getHours() + 1, 10) : 10;
            let endTime = 21;

            for (let hour = startTime; hour < endTime; hour++) {
                for (let minute of [0, 30]) {
                    let formattedTime = `${hour}:${minute === 0 ? '00' : '30'}`;
                    let slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;

                    const isSlotAvailable =
                        !docInfo.slots_booked[slotDate]?.includes(formattedTime);

                    if (isSlotAvailable) {
                        timeSlots.push({
                            datetime: new Date(currentDate.setHours(hour, minute)),
                            time: formattedTime,
                        });
                    }
                }
            }

            if (timeSlots.length > 0) slotsArray.push(timeSlots);
        }

        setDocSlots(slotsArray);
        setLoading(false);
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book an appointment');
            return navigate('/login');
        }

        const date = docSlots[slotIndex][0].datetime;
        const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/book-appointment`,
                { docId, slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getDoctosData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return docInfo ? (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Doctor Info Card */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md">
                <img className="w-32 h-32 rounded-full border-4 border-white" src={docInfo.image} alt={docInfo.name} />
                <div>
                    <p className="text-2xl font-semibold flex items-center gap-2">
                        {docInfo.name} <img className="w-6" src={assets.verified_icon} alt="Verified" />
                    </p>
                    <p className="text-lg">{docInfo.degree} - {docInfo.speciality}</p>
                    <p className="text-sm opacity-90 mt-1">{docInfo.experience} years experience</p>
                    <p className="text-lg font-semibold mt-2">Fee: {currencySymbol}{docInfo.fees}</p>
                </div>
            </div>

            {/* Booking Slots */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">Select a Slot</h2>
                {loading ? (
                    <p className="text-gray-500 mt-3">Loading slots...</p>
                ) : (
                    <>
                        {/* Days of the week */}
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                            {docSlots.map((slots, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSlotIndex(index)}
                                    className={`cursor-pointer py-3 px-5 rounded-lg transition-all ${
                                        slotIndex === index
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    <p>{daysOfWeek[slots[0].datetime.getDay()]}</p>
                                    <p className="text-lg font-bold">{slots[0].datetime.getDate()}</p>
                                </div>
                            ))}
                        </div>

                        {/* Time Slots */}
                        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                            {docSlots[slotIndex]?.map((slot, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSlotTime(slot.time)}
                                    className={`px-5 py-2 rounded-lg text-sm transition-all ${
                                        slotTime === slot.time
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>

                        {/* Book Appointment Button */}
                        <button
                            onClick={bookAppointment}
                            className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all"
                        >
                            Book Appointment
                        </button>
                    </>
                )}
            </div>

            {/* Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null;
};

export default Appointment;
