import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utills/API";
import "../CSS/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [tourBookings, setTourBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token || !storedUser) {
      navigate("/");
      return;
    }

    setUser(storedUser);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    Promise.all([
      API.get("/my-bookings", { headers }),
      API.get("/myexplore", {
  headers: { Authorization: `Bearer ${token}` },
})

    ])
      .then(([flightRes, tourRes]) => {
        setBookings(flightRes.data || []);
        setTourBookings(tourRes.data || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [navigate]);
const cancelFlightBooking = async (id) => {
  if (!window.confirm("Are you sure you want to cancel this flight booking?")) return;
  try {
    const token = localStorage.getItem("token");
    await API.delete(`/cancel-booking/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(prev => prev.filter(b => b._id !== id));
    alert("Flight booking cancelled successfully");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to cancel flight booking");
  }
};

const cancelTourBooking = async (id) => {
  if (!window.confirm("Are you sure you want to cancel this tour booking?")) return;
  try {
    const token = localStorage.getItem("token");
    await API.delete(`/cancel-tour/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTourBookings(prev => prev.filter(b => b._id !== id));
    alert("Tour booking cancelled successfully");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to cancel tour booking");
  }
};

  if (!user) return null;

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-card">
        <div className="avatar">
          {user.username?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-details">
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      {/* Flight Bookings */}
      <div className="booking-section">
        <h2>✈️ My Bookings</h2>

        {!loading && bookings.length === 0 && (
          <p className="no-bookings">You have no bookings yet</p>
        )}

        {bookings.length > 0 && (
          <div className="booking-grid">
            {bookings.map(b => (
              <div className="booking-card" key={b._id}>
                <p><strong>From:</strong> {b.from}</p>
                <p><strong>To:</strong> {b.to}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(b.travelDate).toDateString()}
                </p>
                <p>
                  <strong>Seats:</strong> {b.seats?.join(", ")}
                </p>

                <button className="cancel-btn" onClick={() => cancelFlightBooking(b._id)}>
  Cancel Booking
</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tour Bookings */}
      <div className="booking-section">
        <h2>🏨 Tour Package Bookings</h2>

        {!loading && tourBookings.length === 0 && (
          <p className="no-bookings">No tour bookings yet</p>
        )}

        {tourBookings.length > 0 && (
          <div className="booking-grid">
            {tourBookings.map(b => (
              <div className="booking-card" key={b._id}>
                <p><strong>Destination:</strong> {b.destination}</p>
                <p>
                  <strong>Check-in:</strong>{" "}
                  {new Date(b.checkIn).toDateString()}
                </p>
                <p>
                  <strong>Check-out:</strong>{" "}
                  {new Date(b.checkOut).toDateString()}
                </p>
                <p><strong>Price:</strong> ₹{b.price}</p>
                <button className="cancel-btn" onClick={() => cancelTourBooking(b._id)}>
  Cancel Booking
</button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
