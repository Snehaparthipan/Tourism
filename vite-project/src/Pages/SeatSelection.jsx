import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import API from "../Utills/API";
import "../CSS/slot.css";

const rows = [1, 2, 3, 4, 5, 6];
const left = ["A", "B", "C"];
const right = ["D", "E", "F"];

export default function SeatSelection() {
  const { placeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date, travellers } = location.state || {};

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // redirect if not logged in
  useEffect(() => {
    if (!token) {
      alert("You must login first!");
      navigate("/login");
    }
  }, [token, navigate]);

  // fetch seats
 useEffect(() => {
  API.get(`/seats/${placeId}`)
    .then(res => {
      const booked = res.data
        .filter(s => s.isBooked)
        .map(s => s.seatNumber);
      setBookedSeats(booked);
    })
    .catch(err => {
      console.error("Failed to fetch seats:", err);
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
    if (!selectedSeats.length) return;

    try {
      setLoading(true)

      await API.post(
  "/seats/book",
  {
    placeId,
    seats: selectedSeats,
    from,
    to,
    date
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);

      alert("Booking Successful ✈️");
      setOpenDialog(false);

      // refresh booked seats
      const res = await API.get(`/seats/${placeId}`);
      const booked = res.data
        .filter(s => s.isBooked)
        .map(s => s.seatNumber);
      setBookedSeats(booked);
      setSelectedSeats([]);

    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seat-page">

      {/* FLIGHT HEADER */}
      <div className="flight-header">
        <h2>{from} ➝ {to}</h2>
        <p>{date} • {travellers?.adults} Adult • {travellers?.class}</p>
      </div>

      {/* LEGEND */}
      <div className="legend">
        <span><i className="free" /> Available</span>
        <span><i className="selected" /> Selected</span>
        <span><i className="booked" /> Booked</span>
      </div>

      {/* SEAT GRID */}
      <div className="seat-grid">
        {rows.map(row => (
          <div className="seat-row" key={row}>
            {left.map(col => {
              const seat = col + row;
              return (
                <button
                  key={seat}
                  className={`seat-btn
                    ${bookedSeats.includes(seat) ? "booked" : ""}
                    ${selectedSeats.includes(seat) ? "selected" : ""}
                  `}
                  disabled={bookedSeats.includes(seat)}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat}
                </button>
              );
            })}

            <div className="aisle"></div>

            {right.map(col => {
              const seat = col + row;
              return (
                <button
                  key={seat}
                  className={`seat-btn
                    ${bookedSeats.includes(seat) ? "booked" : ""}
                    ${selectedSeats.includes(seat) ? "selected" : ""}
                  `}
                  disabled={bookedSeats.includes(seat)}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="seat-footer">
        <p>
          Selected Seats: <strong>{selectedSeats.join(", ") || "None"}</strong>
        </p>
        <p>
          Travellers: <strong>{travellers?.adults} Adult</strong> • <strong>{travellers?.class}</strong>
        </p>
        <button
          className="continue-btn"
          disabled={!selectedSeats.length || loading}
          onClick={() => setOpenDialog(true)}
        >
          {loading ? "Booking..." : "Continue"}
        </button>
      </div>

      {/* MODAL */}
      {openDialog && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Confirm Your Booking</h3>
            <div className="summary">
              <p><span>From</span> {from}</p>
              <p><span>To</span> {to}</p>
              <p><span>Date</span> {date}</p>
              <p><span>Seats</span> {selectedSeats.join(", ")}</p>
              <p><span>Class</span> {travellers?.class}</p>
            </div>

            <div className="modal-actions">
              <button className="cancel" onClick={() => setOpenDialog(false)}>
                Cancel
              </button>
              <button className="confirm" onClick={confirmBooking}>
                {loading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
