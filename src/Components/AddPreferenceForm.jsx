// AddPreferenceForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddPreferenceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    reg_no: '',
    phone_no: '', // Changed from phone
    state: '',
    hobbies: '', // Corrected from hobies
    messtype: 'Vegetarian', // Changed from mess
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("trigger");
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      toast.success(response.data.message);
      setFormData({
        name: '',
        reg_no: '',
        phone_no: '',
        state: '',
        hobbies: '',
        messtype: 'Vegetarian',
        email: '',
        password: '',
      });
    } catch (error) {
      toast.error('Error adding preferences. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <h2>Add Your Preferences</h2>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="reg_no" placeholder="Registration No" value={formData.reg_no} onChange={handleChange} required />
      <input type="text" name="phone_no" placeholder="Phone No" value={formData.phone_no} onChange={handleChange} required />
      <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
      <input type="text" name="hobbies" placeholder="Hobbies" value={formData.hobbies} onChange={handleChange} />
      <select name="messtype" value={formData.messtype} onChange={handleChange} required>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Non-Vegetarian">Non-Vegetarian</option>
        <option value="Special">Special</option>
      </select>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default AddPreferenceForm;