import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utills/API";
import "../CSS/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
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

    API.get("/my-bookings", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setBookings(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const cancelBooking = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/cancel-booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(prev => prev.filter(b => b._id !== id));
      alert("Booking cancelled successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  // if (loading) return <p className="loading">Loading profile...</p>;
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

      {/* Booking Section */}
      <div className="booking-section">
        <h2>My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="no-bookings">You have no bookings yet</p>
        ) : (
          <div className="booking-grid">
            {bookings.map((b) => (
              <div className="booking-card" key={b._id}>
                <div className="booking-row">
                  <span>From</span>
                  <p>{b.from}</p>
                </div>
                <div className="booking-row">
                  <span>To</span>
                  <p>{b.to}</p>
                </div>
                <div className="booking-row">
                  <span>Date</span>
                  <p>{new Date(b.travelDate).toDateString()}</p>
                </div>
                <div className="booking-row">
                  <span>Seats</span>
                  <p>{b.seats.join(", ")}</p>
                </div>

                <button
                  className="cancel-btn"
                  onClick={() => cancelBooking(b._id)}
                >
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
