import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
    const { currency, backendUrl } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            };

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken]);

    return profileData && (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 p-5'>
            <div className='bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full'>
                <div className='flex flex-col md:flex-row items-center gap-6'>
                    <img className='w-40 h-40 rounded-full object-cover shadow-md' src={profileData.image} alt="Profile" />
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-2xl font-bold text-gray-800'>{profileData.name}</h2>
                        <p className='text-gray-600 mt-1'>{profileData.degree} - {profileData.speciality}</p>
                        <span className='text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full mt-2 inline-block'>{profileData.experience} years experience</span>
                    </div>
                </div>
                
                <div className='mt-6'>
                    <h3 className='text-lg font-semibold text-gray-700'>About</h3>
                    {isEdit ? (
                        <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} className='w-full p-3 border rounded-lg mt-2' rows={4} value={profileData.about} />
                    ) : (
                        <p className='text-gray-600 mt-2'>{profileData.about}</p>
                    )}
                </div>

                <div className='mt-4'>
                    <h3 className='text-lg font-semibold text-gray-700'>Appointment Fee</h3>
                    {isEdit ? (
                        <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} className='w-full p-2 border rounded-lg mt-2' value={profileData.fees} />
                    ) : (
                        <p className='text-gray-600 mt-2'>{currency} {profileData.fees}</p>
                    )}
                </div>

                <div className='mt-4'>
                    <h3 className='text-lg font-semibold text-gray-700'>Address</h3>
                    {isEdit ? (
                        <div className='space-y-2'>
                            <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} className='w-full p-2 border rounded-lg' value={profileData.address.line1} />
                            <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} className='w-full p-2 border rounded-lg' value={profileData.address.line2} />
                        </div>
                    ) : (
                        <p className='text-gray-600 mt-2'>{profileData.address.line1}, {profileData.address.line2}</p>
                    )}
                </div>

                <div className='flex items-center mt-4'>
                    <input type='checkbox' onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} className='w-4 h-4' />
                    <label className='ml-2 text-gray-700'>Available</label>
                </div>

                <div className='mt-6 flex justify-end'>
                    {isEdit ? (
                        <button onClick={updateProfile} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all'>Save</button>
                    ) : (
                        <button onClick={() => setIsEdit(prev => !prev)} className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all'>Edit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
