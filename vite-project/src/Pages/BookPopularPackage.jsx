import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/booktour.css";
import API from "../Utills/API";
import { packages } from "../Components/PopularPackage"; // your package array
import Navbar from "../Components/Navbar";

export default function BookPopularPackage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pkg = packages.find((p) => p.id === Number(id));
  if (!pkg) return <h2 style={{ textAlign: "center" }}>Package not found</h2>;
const handleBooking = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  try {
    const res = await API.post(
      "/popular/book",
      {
        packageId: pkg.id,
        packageTitle: pkg.title,
        price: pkg.price,
        days: pkg.days,
        countries: pkg.countries,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // <- REQUIRED
        },
      }
    );

    alert(res.data.message || "Booking successful 🎉");
    navigate("/profile");
  } catch (err) {
    console.error("Booking error:", err.response?.data || err);
    alert(err.response?.data?.message || "Booking failed");
  }
};


  return (
    <>
    <Navbar/>
    <section className="bt-wrapper">
      <div className="bt-card">
        <div className="bt-image-box">
          <img src={pkg.image} alt={pkg.title} />
        </div>

        <div className="bt-details">
          <h1 className="bt-title">{pkg.title}</h1>
          <p className="bt-price">{pkg.days}</p>
          <p className="bt-price">
            Countries: {pkg.countries.join(", ")}
          </p>
          <p className="bt-price">
            Package Price: <span>{pkg.price}</span>
          </p>

          <button className="bt-book-btn" onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
