import React, { useState } from "react";

const BookingForm = ({ onBook }) => {
  const [formData, setFormData] = useState({
    name: "",
    vehicleNumber: "",
    duration: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Booking Form</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="block w-full p-2 mb-3 border rounded"
        required
      />
      <input
        type="text"
        name="vehicleNumber"
        placeholder="Vehicle Number"
        value={formData.vehicleNumber}
        onChange={handleChange}
        className="block w-full p-2 mb-3 border rounded"
        required
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (hours)"
        value={formData.duration}
        onChange={handleChange}
        className="block w-full p-2 mb-3 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        Book Spot
      </button>
    </form>
  );
};

export default BookingForm;
