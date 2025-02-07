import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  // Function to update user profile
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="max-w-lg flex flex-col gap-4 mx-auto bg-white p-6 rounded-lg shadow-lg text-sm mt-10 transition-all">
      {/* Profile Image Section */}
      <div className="flex flex-col items-center">
        <label htmlFor="image" className="relative cursor-pointer">
          <img
            className="w-36 h-36 rounded-full border-4 border-gray-200 object-cover shadow-md"
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="Profile"
          />
          {isEdit && (
            <div className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full shadow-md">
              <img className="w-6 h-6" src={assets.upload_icon} alt="Upload" />
            </div>
          )}
        </label>
        {isEdit && (
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        )}
      </div>

      {/* Name Input */}
      <div className="text-center">
        {isEdit ? (
          <input
            className="text-2xl font-semibold text-gray-700 text-center bg-gray-100 p-2 rounded-md w-full"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
          />
        ) : (
          <p className="text-2xl font-semibold text-gray-800">{userData.name}</p>
        )}
      </div>

      <hr className="border-gray-300" />

      {/* Contact Information */}
      <div>
        <p className="text-gray-600 font-semibold mb-2">📞 Contact Information</p>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="border p-2 rounded bg-gray-100 w-full"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              value={userData.phone}
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div>
              <input
                className="border p-2 rounded bg-gray-100 w-full mb-1"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />
              <input
                className="border p-2 rounded bg-gray-100 w-full"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
              />
            </div>
          ) : (
            <p className="text-gray-600">
              {userData.address.line1} <br /> {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-gray-600 font-semibold mb-2">🎯 Basic Information</p>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="border p-2 rounded bg-gray-100 w-full"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="border p-2 rounded bg-gray-100 w-full"
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {isEdit ? (
          <>
            <button
              onClick={updateUserProfileData}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
