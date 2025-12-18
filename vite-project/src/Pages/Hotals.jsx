import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/search.css";
import API from "../Utills/API";

export default function Hotals() {
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!city) {
      setHotels([]);
      return;
    }

    const timer = setTimeout(() => {
      API
        .get(`/hotel?search=${city}`)
        .then(res => setHotels(res.data));
    }, 300);

    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div className="search-wrapper">
      <div className="search-card" style={{display:"flex"}}>
        <div className="box" >
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
                    navigate("/bookhotel", { state: { hotel } })
                  }
                >
                  {hotel.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="box"><input type="date" /></div>
      </div>
    </div>
  );
}
