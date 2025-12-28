import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/destination.css";


export const destinations = [
  {
    id: 1,
    name: "Paris, France",
    desc: "The city of lights and romance",
    days: "7 Days",
    price: "$199",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200",
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    desc: "Tropical paradise with ancient temples",
    days: "5 Days",
    price: "$899",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200",
  },
  {
    id: 3,
    name: "Maldives",
    desc: "Luxury overwater bungalows",
    days: "6 Days",
    price: "$499",
    image:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1200",
  },
  {
    id: 4,
    name: "Tokyo, Japan",
    desc: "Modern meets traditional culture",
    days: "8 Days",
    price: "$599",
    image:
      "https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=1200",
  },
  {
  id: 5,
  name: "Manali, India",
  desc: "Snowy mountains and scenic valleys",
  days: "6 Days",
  price: "$799",
  image:
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
},
{
  id: 6,
  name: "Dubai, UAE",
  desc: "Luxury shopping and iconic skyscrapers",
  days: "5 Days",
  price: "$999",
  image:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
},

];

export default function TopDestinations() {
  const navigate = useNavigate();

  return (
    <section className="destinations">
      <div className="dest-header">
        <div>
          <h2>Top Destinations</h2>
          <p>Handpicked destinations that promise unforgettable experiences</p>
        </div>
        <button className="view-btn">View All Destinations</button>
      </div>

      <div className="dest-grid">
        {destinations.map((item) => (
          <div className="dest-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="dest-content">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>

              <div className="dest-footer">
                <span>🕒 {item.days}</span>
                <span className="price">{item.price}</span>
              </div>

              {/* Navigate to booking page */}
              <button
                className="explore-btn"
                onClick={() => navigate(`/explore/${item.id}`)}
              >
                Explore →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
