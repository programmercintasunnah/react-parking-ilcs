import React, { useState, useEffect } from "react";
import ParkingMap from "./components/ParkingMap";
import BookingForm from "./components/BookingForm";
import BookingDetails from "./components/BookingDetails";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

function App() {
  const [spots, setSpots] = useState([
    { id: 1, vehicleType: "motor", isOccupied: false },
    { id: 2, vehicleType: "motor", isOccupied: false },
    { id: 3, vehicleType: "motor", isOccupied: false },
    { id: 4, vehicleType: "motor", isOccupied: false },
    { id: 5, vehicleType: "motor", isOccupied: false },
    { id: 6, vehicleType: "mobil", isOccupied: false },
    { id: 7, vehicleType: "mobil", isOccupied: false },
    { id: 8, vehicleType: "mobil", isOccupied: false },
    { id: 9, vehicleType: "mobil", isOccupied: false },
    { id: 10, vehicleType: "mobil", isOccupied: false },
    { id: 11, vehicleType: "bus", isOccupied: false },
    { id: 12, vehicleType: "bus", isOccupied: false },
    { id: 13, vehicleType: "bus", isOccupied: false },
    { id: 14, vehicleType: "bus", isOccupied: false },
    { id: 15, vehicleType: "bus", isOccupied: false },
    { id: 16, vehicleType: "mobil", isOccupied: false },
    { id: 17, vehicleType: "motor", isOccupied: false },
    { id: 18, vehicleType: "bus", isOccupied: false },
    { id: 19, vehicleType: "mobil", isOccupied: false },
    { id: 20, vehicleType: "motor", isOccupied: false },
    { id: 21, vehicleType: "bus", isOccupied: false },
    { id: 22, vehicleType: "bus", isOccupied: false },
    { id: 23, vehicleType: "bus", isOccupied: false },
    { id: 24, vehicleType: "mobil", isOccupied: false },
    { id: 25, vehicleType: "mobil", isOccupied: false },
    { id: 26, vehicleType: "motor", isOccupied: false },
    { id: 27, vehicleType: "motor", isOccupied: false },
    { id: 28, vehicleType: "bus", isOccupied: false },
    { id: 29, vehicleType: "mobil", isOccupied: false },
    { id: 30, vehicleType: "mobil", isOccupied: false },
  ]);

  const [selectedSpot, setSelectedSpot] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
    setSpots((prevSpots) =>
      prevSpots.map((spot) =>
        savedBookings.some((b) => b.spotId === spot.id)
          ? { ...spot, isOccupied: true }
          : spot
      )
    );
  }, []);

  const handleSelectSpot = (spot) => {
    setSelectedSpot(spot);
    setShowModal(true);
  };

  const handleBook = (formData) => {
    const newBooking = {
      ...formData,
      spotId: selectedSpot.id,
      startTime: new Date().toLocaleTimeString(),
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setSpots((prevSpots) =>
      prevSpots.map((s) =>
        s.id === selectedSpot.id ? { ...s, isOccupied: true } : s
      )
    );
    setSelectedSpot(null);
    setShowModal(false);
    setToastMessage("Spot successfully booked!");
  };

  const handleCheckOut = (spotId) => {
    const updatedBookings = bookings.filter((b) => b.spotId !== spotId);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setSpots((prevSpots) =>
      prevSpots.map((s) => (s.id === spotId ? { ...s, isOccupied: false } : s))
    );
    setToastMessage("Spot successfully checked out!");
  };

  const filteredSpots = spots.filter(
    (spot) =>
      (spot.vehicleType.includes(filterType) || filterType === "") &&
      (spot.id.toString().includes(searchTerm) || searchTerm === "")
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Parking Management System
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search by Spot ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-auto"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded w-full md:w-auto"
        >
          <option value="">All Types</option>
          <option value="motor">Motor</option>
          <option value="mobil">Mobil</option>
          <option value="bus">Bus</option>
        </select>
      </div>

      <ParkingMap spots={filteredSpots} onSelectSpot={handleSelectSpot} />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {selectedSpot && !selectedSpot.isOccupied ? (
            <BookingForm onBook={handleBook} />
          ) : (
            <BookingDetails
              booking={bookings.find((b) => b.spotId === selectedSpot.id)}
              onCheckOut={() => handleCheckOut(selectedSpot.id)}
            />
          )}
        </Modal>
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}

export default App;
