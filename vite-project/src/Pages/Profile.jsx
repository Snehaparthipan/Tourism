import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utills/API";
import "../CSS/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [tourBookings, setTourBookings] = useState([]);
  const [popBooking, setPopBooking] = useState([]);
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

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      API.get("/my-bookings", { headers }),
      API.get("/myexplore", { headers }),
      API.get("/popular/my-bookings", { headers }),
    ])
      .then(([flightRes, tourRes, popRes]) => {
        setBookings(flightRes.data || []);
        setTourBookings(tourRes.data || []);
        setPopBooking(popRes.data || []);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  /* CANCEL FUNCTIONS */
  const cancelFlightBooking = async (id) => {
    if (!window.confirm("Cancel this flight booking?")) return;
    const token = localStorage.getItem("token");
    await API.delete(`/cancel-booking/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(b => b.filter(x => x._id !== id));
  };

  const cancelTourBooking = async (id) => {
    if (!window.confirm("Cancel this tour booking?")) return;
    const token = localStorage.getItem("token");
    await API.delete(`/cancel-tour/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTourBookings(b => b.filter(x => x._id !== id));
  };

  const cancelPopBooking = async (id) => {
    if (!window.confirm("Cancel this package booking?")) return;
    const token = localStorage.getItem("token");
    await API.delete(`/popular/cancel/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPopBooking(b => b.filter(x => x._id !== id));
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <button className="edit-btn" onClick={()=>navigate("/home")}>Back</button>
      {/* PROFILE HEADER */}
      <div className="profile-header">
        <div className="profile-image">
          <span>{user.username.charAt(0).toUpperCase()}</span>
        </div>

        <div className="profile-info">
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      {/* FLIGHT BOOKINGS */}
      <Section
        title="Flight Bookings"
        emptyText="No flight bookings yet"
        loading={loading}
        data={bookings}
      >
        {bookings.map(b => (
          <BookingCard key={b._id}>
            <p><b>From:</b> {b.from}</p>
            <p><b>To:</b> {b.to}</p>
            <p><b>Date:</b> {new Date(b.travelDate).toDateString()}</p>
            <p><b>Seats:</b> {b.seats?.join(", ")}</p>
            <button onClick={() => cancelFlightBooking(b._id)}>Cancel</button>
          </BookingCard>
        ))}
      </Section>

      {/* TOUR BOOKINGS */}
      <Section
        title="Tour Packages"
        emptyText="No tour bookings yet"
        loading={loading}
        data={tourBookings}
      >
        {tourBookings.map(b => (
          <BookingCard key={b._id}>
            <p><b>Destination:</b> {b.destination}</p>
            <p><b>Check-in:</b> {new Date(b.checkIn).toDateString()}</p>
            <p><b>Check-out:</b> {new Date(b.checkOut).toDateString()}</p>
            <p><b>Price:</b> ₹{b.price}</p>
            <button onClick={() => cancelTourBooking(b._id)}>Cancel</button>
          </BookingCard>
        ))}
      </Section>

      {/* POPULAR BOOKINGS */}
      <Section
        title="Popular Packages"
        emptyText="No popular bookings yet"
        loading={loading}
        data={popBooking}
      >
        {popBooking.map(b => (
          <BookingCard key={b._id}>
            <p><b>Package:</b> {b.packageTitle}</p>
            <p><b>Price:</b> ₹{b.price}</p>
            <button onClick={() => cancelPopBooking(b._id)}>Cancel</button>
          </BookingCard>
        ))}
      </Section>

    </div>
  );
}

/* REUSABLE COMPONENTS */
const Section = ({ title, emptyText, loading, data, children }) => (
  <div className="booking-section">
    <h3>{title}</h3>
    {!loading && data.length === 0 && <p className="no-bookings">{emptyText}</p>}
    {data.length > 0 && <div className="booking-grid">{children}</div>}
  </div>
);

const BookingCard = ({ children }) => (
  <div className="booking-card">
    {children}
  </div>
);
