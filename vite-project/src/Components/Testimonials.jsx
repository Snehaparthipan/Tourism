import { useEffect, useState } from "react";
import "../css/testimonials.css";

const messages = [
  "Our trip was absolutely magical! Everything was perfectly organized.",
  "Fantastic service and unforgettable destinations. Highly recommended!",
  "Seamless planning and great support throughout our journey.",
  "Every moment was pure bliss. Can’t wait to travel again!",
  "Well-organized itinerary and wonderful experience overall.",
  "Best travel experience ever with amazing support!",
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=6")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((user, i) => ({
          id: i,
          name: `${user.name.first} ${user.name.last}`,
          location: user.location.country,
          avatar: user.picture.medium, // ✅ REAL HUMAN IMAGE
          rating: 5,
          message: messages[i % messages.length],
          role: "Adventure Traveler",
        }));
        setTestimonials(formatted);
      });
  }, []);

  return (
    <section className="testimonial-container">
      <h2>What Our Client Say</h2>
      <p className="sub">
        Hear what our happy travelers have to say about their experiences
      </p>

      <div className="testimonial-grid">
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.id}>
            <div className="stars">★★★★★</div>

            <p className="message">"{t.message}"</p>

            <div className="user">
              <img src={t.avatar} alt={t.name} />
              <div>
                <h4>{t.name}</h4>
                <span>
                  {t.role}, {t.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
