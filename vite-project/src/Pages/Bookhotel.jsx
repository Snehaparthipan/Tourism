import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../Utills/API";
import "../CSS/bookhotel.css"; 

function Bookhotel() {
  const location = useLocation();
  const { hotel, date } = location.state || {};

  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    if (!hotel) return;
    API.get(`/rooms/${hotel._id}`)
      .then(res => setRooms(res.data))
      .catch(err => console.log(err));
  }, [hotel]);

  const toggleRoom = (type) => {
    setSelectedRooms(prev =>
      prev.includes(type) ? prev.filter(r => r !== type) : [...prev, type]
    );
  };

  const confirmBooking = async () => {
    try {
      await API.post("/rooms/book", {
        hotelId: hotel._id,
        rooms: selectedRooms
      });

      alert(
        `Booking successful!\nHotel: ${hotel.name}\nRooms: ${selectedRooms.join(
          ", "
        )}\nDate: ${date}`
      );
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="seat-container">
      <h2>{hotel?.name} - Select Rooms</h2>
      <p>Booking Date: {date}</p>

      {rooms.map(room => (
        <div key={room._id} className="seat-row">
          <button
            className={`seat ${
              room.bookedRooms >= room.totalRooms ? "booked" : ""
            } ${selectedRooms.includes(room.type) ? "selected" : ""}`}
            onClick={() => toggleRoom(room.type)}
            disabled={room.bookedRooms >= room.totalRooms}
          >
            {room.type} ({room.totalRooms - room.bookedRooms} left)
          </button>
        </div>
      ))}

      <h3>Selected Rooms: {selectedRooms.join(", ") || "None"}</h3>
      <button
        className="confirm-btn"
        disabled={!selectedRooms.length}
        onClick={confirmBooking}
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default Bookhotel;
