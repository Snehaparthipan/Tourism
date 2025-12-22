import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Utills/API";
import "../CSS/slot.css";

const rows = [1, 2, 3, 4, 5, 6];
const left = ["A", "B", "C"];
const right = ["D", "E", "F"];

function SeatSelection() {
  const { placeId } = useParams();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    API.get(`/seats/${placeId}`)
      .then(res => {
        const booked = res.data
          .filter(seat => seat.isBooked)
          .map(seat => seat.seatNumber);
        setBookedSeats(booked);
      });
  }, [placeId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };
const confirmBooking = async () => {
  try {
    console.log("SENDING:", {
      placeId,
      seats: selectedSeats
    });

    await API.post("/seats/book", {
      placeId,
      seats: selectedSeats
    });

    alert("Booking successful");
  } catch (err) {
    console.error(
      "BOOKING ERROR:",
      err.response?.data || err.message
    );
    alert(err.response?.data?.message || "Booking failed");
  }
};


  return (
    <div className="seat-container">
      <h2>Select Seats</h2>

      {rows.map(row => (
        <div className="seat-row" key={row}>
          {left.map(col => {
            const seat = col + row;
            return (
              <button
                key={seat}
                className={`seat
                  ${bookedSeats.includes(seat) ? "booked" : ""}
                  ${selectedSeats.includes(seat) ? "selected" : ""}
                `}
                onClick={() => toggleSeat(seat)}
              >
                {seat}
              </button>
            );
          })}

          <div className="aisle" />

          {right.map(col => {
            const seat = col + row;
            return (
              <button
                key={seat}
                className={`seat
                  ${bookedSeats.includes(seat) ? "booked" : ""}
                  ${selectedSeats.includes(seat) ? "selected" : ""}
                `}
                onClick={() => toggleSeat(seat)}
              >
                {seat}
              </button>
            );
          })}
        </div>
      ))}

      <h3>Selected: {selectedSeats.join(", ") || "None"}</h3>

      <button
        className="confirm-btn"
        disabled={!selectedSeats.length}
        onClick={confirmBooking}
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default SeatSelection;
