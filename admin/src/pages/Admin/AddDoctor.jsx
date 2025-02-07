import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    experience: '1 Year',
    fees: '',
    about: '',
    speciality: 'General physician',
    degree: '',
    address1: '',
    address2: ''
  });

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg) return toast.error('Image Not Selected');

    try {
      const newFormData = new FormData();
      newFormData.append('image', docImg);
      Object.entries(formData).forEach(([key, value]) => newFormData.append(key, value));
      newFormData.append('address', JSON.stringify({ line1: formData.address1, line2: formData.address2 }));

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', newFormData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        setDocImg(null);
        setFormData({
          name: '', email: '', password: '', experience: '1 Year', fees: '', about: '', speciality: 'General physician', degree: '', address1: '', address2: ''
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
      <p className="mb-6 text-2xl font-semibold text-blue-700">Add Doctor</p>
      <div className="flex flex-col items-center gap-6 text-gray-600">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img className="w-20 h-20 rounded-full object-cover border border-gray-300" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Doctor" />
        </label>
        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
        <p className="text-sm">Upload Doctor Picture</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {['name', 'email', 'password', 'fees', 'degree', 'address1', 'address2'].map((field) => (
          <div key={field} className="flex flex-col">
            <p className="text-gray-700 font-medium capitalize">{field.replace('1', ' 1').replace('2', ' 2')}</p>
            <input 
              type={field === 'password' ? 'password' : field === 'fees' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <div className="flex flex-col">
          <p className="text-gray-700 font-medium">Experience</p>
          <select name="experience" value={formData.experience} onChange={handleInputChange} className="border border-gray-300 rounded px-4 py-2">
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={`${n + 1} Year`}>{n + 1} Year{n > 0 && 's'}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700 font-medium">Speciality</p>
          <select name="speciality" value={formData.speciality} onChange={handleInputChange} className="border border-gray-300 rounded px-4 py-2">
            {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-700 font-medium">About Doctor</p>
        <textarea name="about" value={formData.about} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write about the doctor" required></textarea>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition-all">Add Doctor</button>
    </form>
  );
};

export default AddDoctor;
