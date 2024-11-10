import React from "react";

const BookingDetails = ({ booking, onCheckOut }) => (
  <div className="mt-1">
    {booking ? (
      <div className="p-4 bg-gray-100 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
        <p>Spot ID: {booking.spotId}</p>
        <p>Name: {booking.name}</p>
        <p>Vehicle Number: {booking.vehicleNumber}</p>
        <p>Start Time: {booking.startTime}</p>
        <p>Duration: {booking.duration} hours</p>
        <button
          onClick={onCheckOut}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full"
        >
          Check Out
        </button>
      </div>
    ) : (
      <p>No booking details available.</p>
    )}
  </div>
);

export default BookingDetails;
