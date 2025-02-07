import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className="bg-gray-50 py-8 px-4 sm:px-8">
            <p className="text-2xl font-semibold text-gray-700 mb-6">My Appointments</p>
            <div className="space-y-6">
                {appointments.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-center md:items-start p-6 space-y-4 md:space-y-0 md:space-x-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                            <img className="object-cover w-full h-full" src={item.docData.image} alt="" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <p className="text-lg font-semibold text-gray-800">{item.docData.name}</p>
                            <p className="text-sm text-gray-500">{item.docData.speciality}</p>
                            <div>
                                <p className="text-sm text-gray-700 font-medium">Address:</p>
                                <p className="text-sm text-gray-600">{item.docData.address.line1}</p>
                                <p className="text-sm text-gray-600">{item.docData.address.line2}</p>
                            </div>
                            <p className="text-sm text-gray-700 mt-2"><span className="font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                        </div>
                        <div className="space-y-2 flex flex-col items-center justify-end">
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button
                                    onClick={() => setPayment(item._id)}
                                    className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
                                >
                                    Pay Online
                                </button>
                            )}
                            {payment === item._id && !item.cancelled && !item.payment && !item.isCompleted && (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => appointmentStripe(item._id)}
                                        className="bg-gray-100 py-2 px-6 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition-all duration-300"
                                    >
                                        <img className="w-6 h-6" src={assets.stripe_logo} alt="Stripe" />
                                        <span>Stripe</span>
                                    </button>
                                    <button
                                        onClick={() => appointmentRazorpay(item._id)}
                                        className="bg-gray-100 py-2 px-6 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition-all duration-300"
                                    >
                                        <img className="w-6 h-6" src={assets.razorpay_logo} alt="Razorpay" />
                                        <span>Razorpay</span>
                                    </button>
                                </div>
                            )}
                            {item.payment && !item.isCompleted && !item.cancelled && (
                                <p className="text-sm text-green-500 font-medium">Paid</p>
                            )}
                            {item.isCompleted && (
                                <p className="text-sm text-green-500 font-medium">Completed</p>
                            )}
                            {item.cancelled && !item.isCompleted && (
                                <p className="text-sm text-red-500 font-medium">Cancelled</p>
                            )}
                            {!item.cancelled && !item.isCompleted && (
                                <button
                                    onClick={() => cancelAppointment(item._id)}
                                    className="text-red-500 py-2 px-6 border rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
                                >
                                    Cancel Appointment
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
