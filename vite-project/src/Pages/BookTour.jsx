import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/booktour.css";
import API from "../Utills/API";
// import { destinations } from "../Components/TopDestinations";
import { destinations } from "../Pages/Destination"
import Navbar from "../Components/Navbar";

export default function BookTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tour = destinations.find((d) => d.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  if (!tour) {
    return <h2 style={{ textAlign: "center" }}>Tour not found</h2>;
  }

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select dates");
      return;
    }

    if (checkOut <= checkIn) {
      alert("Check-out must be after check-in");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      await API.post(
        "/explore",
        {
          destination: tour.name,        
          checkIn: new Date(checkIn),       
          checkOut: new Date(checkOut),    
          price: Number(tour.price.replace("$", ""))
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Successful 🎉");
      // navigate("/profile");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <>
    <Navbar/>
    <section className="bt-wrapper">
      <div className="bt-card">
        <div className="bt-image-box">
          <img src={tour.image} alt={tour.name} />
        </div>

        <div className="bt-details">
          <h1 className="bt-title">{tour.name}</h1>
        
          <p className="bt-price">
            Package Price: <span>₹{tour.price}</span>
          </p>

          <div className="bt-form">
            <div className="bt-input-group">
              <label>Check-in Date</label>
              <input
                type="date"
                min={minDate}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            <div className="bt-input-group">
              <label>Check-out Date</label>
              <input
                type="date"
                min={checkIn || minDate}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            <button className="bt-book-btn" onClick={handleBooking}>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
