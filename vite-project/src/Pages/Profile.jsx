import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utills/API";
import "../CSS/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
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
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setBookings(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      {/* USER INFO */}
      <div className="profile-card">
        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>

      {/* BOOKINGS */}
      <h3>Booking History</h3>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b, index) => (
          <div className="booking-card" key={index}>
            <p><b>Place ID:</b> {b.placeId}</p>
            <p><b>Seats:</b> {b.seats.join(", ")}</p>
            <p><b>Date:</b> {new Date(b.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
