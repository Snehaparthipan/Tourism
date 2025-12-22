import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/search.css";
import API from "../Utills/API";

export default function Hotels() {
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!city) {
      setHotels([]);
      return;
    }

    const timer = setTimeout(() => {
      API.get(`/hotel?search=${city}`)
        .then(res => setHotels(res.data))
        .catch(console.log);
    }, 300);

    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div className="search-wrapper">
      <div className="search-card" style={{ display: "flex", gap: "10px" }}>
        
        <div className="box">
          <label>City</label>
          <input
            value={city}
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
          />

          {hotels.length > 0 && (
            <ul className="dropdown">
              {hotels.map(hotel => (
                <li
                  key={hotel._id}
                  onClick={() =>
                    navigate("/bookhotel", {
                      state: { hotel, checkIn, checkOut }
                    })
                  }
                >
                  {hotel.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box">
          <label>Check-in</label>
          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
        </div>

        <div className="box">
          <label>Check-out</label>
          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
        </div>

      </div>
    </div>
  );
}
