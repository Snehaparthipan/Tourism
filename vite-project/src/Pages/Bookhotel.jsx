import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../Utills/API";
import "../CSS/bookhotel.css";

export default function Bookhotel() {
  const { state } = useLocation();
  const { hotel, checkIn, checkOut } = state || {};

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [count, setCount] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    API.get(`/rooms/${hotel._id}`)
      .then(res => setRooms(res.data))
      .catch(console.log);
  }, [hotel._id]);

  const confirmBooking = async () => {
    try {
      await API.post("/rooms/book", {
        roomId: selectedRoom._id,
        rooms: Number(count)
      });

      alert("Hotel booking successful!");
      setOpenDialog(false);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="hotel-booking">

      <div className="hotel-info">
        <h2>{hotel.name}</h2>
        <p>{checkIn} → {checkOut}</p>
      </div>

      <h3>Select Room</h3>
      <div className="room-list">
        {rooms.map(room => {
          const available = room.totalRooms - room.bookedRooms;
          return (
            <button
              key={room._id}
              disabled={available === 0}
              className={selectedRoom?._id === room._id ? "room active" : "room"}
              onClick={() => setSelectedRoom(room)}
            >
              {room.type} ({available} left)
            </button>
          );
        })}
      </div>

      <h3>Rooms Count</h3>
      <input
        type="number"
        min="1"
        value={count}
        onChange={e => setCount(e.target.value)}
      />

      <br /><br />

      <button
        className="confirm-btn"
        disabled={!selectedRoom}
        onClick={() => setOpenDialog(true)}
      >
        Book Now
      </button>

      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Confirm Booking</h3>
            <p><b>Hotel:</b> {hotel.name}</p>
            <p><b>Room:</b> {selectedRoom.type}</p>
            <p><b>Count:</b> {count}</p>
            <p><b>Dates:</b> {checkIn} → {checkOut}</p>

            <div className="dialog-actions">
              <button onClick={() => setOpenDialog(false)}>Cancel</button>
              <button onClick={confirmBooking}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
