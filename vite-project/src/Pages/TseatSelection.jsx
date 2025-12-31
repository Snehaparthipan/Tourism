import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utills/API";
import "../CSS/Trainseat.css"

export default function TseatSelection({
  placeId,
  from,
  to,
  date,
  travellers,
  seats
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const confirmBooking = async () => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/api/trainbook",
        {
          placeId,
          from,
          to,
          date,
          travellers,
          seats
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking Successful 🚆");
      setOpen(false);

      // redirect to ticket page
      navigate(`/ticket/${res.data.bookingId}`);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="book-btn" onClick={() => setOpen(true)}>
        Book Now
      </button>

      {open && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>Confirm Your Booking</h3>

            <div className="summary">
              <p><b>From:</b> {from}</p>
              <p><b>To:</b> {to}</p>
              <p><b>Date:</b> {date}</p>
              <p><b>Passengers:</b> {travellers.adults}</p>
              <p><b>Class:</b> {travellers.class}</p>
              <p><b>Seats:</b> {seats.join(", ")}</p>
            </div>

            <div className="actions">
              <button onClick={() => setOpen(false)} className="cancel">
                Cancel
              </button>

              <button
                onClick={confirmBooking}
                className="confirm"
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
