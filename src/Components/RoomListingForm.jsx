// RoomListingForm.jsx

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { firestore } from "../firebase"; // Import the Firebase app instance
import { toast } from "react-toastify";

const RoomListingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    email: "",
    phoneNumber: "",
    state: "",
    hobies: "",
    mess: "",
    roommates: [],
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, "rooms"), formData);
      toast.success("Form Submitted Successfully");
      console.log("Document written with ID: ", docRef.id);
      
      // Clear the form fields after successful submission
      setFormData({
        name: "",
        regNo: "",
        email: "",
        phoneNumber: "",
        state: "",
        hobies: "",
        mess: "",
        roommates: [],
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "2px solid black",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
      }}
    >
      <div>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div>
        <input
          type="text"
          id="regNo"
          name="regNo"
          placeholder="Registration No."
          value={formData.regNo}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone No."
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div>
        <input
          type="text"
          id="state"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div>
        <input
          type="text"
          id="hobies"
          name="hobies"
          placeholder="hobbies"
          value={formData.hobies}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div>
        <select
          id="mess"
          name="mess"
          value={formData.mess}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="">Select Mess Type</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Special">Special</option>
        </select>
      </div>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default RoomListingForm;