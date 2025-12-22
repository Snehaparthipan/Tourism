import React, { useEffect, useState } from "react";
import "../CSS/search.css";
import { useNavigate } from "react-router-dom";
import API from "../Utills/API";

export default function Flight() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const [fromList, setFromList] = useState([]);
  const [toList, setToList] = useState([]);

  const [fromSelected, setFromSelected] = useState(false);
  const [toSelected, setToSelected] = useState(false);

  const [openTravellers, setOpenTravellers] = useState(false);
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    class: "Economy"
  });

  /* FROM SEARCH */
  useEffect(() => {
    if (!from || fromSelected) {
      setFromList([]);
      return;
    }

    const timer = setTimeout(() => {
      API.get(`/places?search=${from}`)
        .then(res => setFromList(res.data))
        .catch(console.log);
    }, 300);

    return () => clearTimeout(timer);
  }, [from, fromSelected]);

  /* TO SEARCH */
  useEffect(() => {
    if (!to || toSelected) {
      setToList([]);
      return;
    }

    const timer = setTimeout(() => {
      API.get(`/places?search=${to}`)
        .then(res => setToList(res.data))
        .catch(console.log);
    }, 300);

    return () => clearTimeout(timer);
  }, [to, toSelected]);

  useEffect(() => {
    setTo("");
    setToList([]);
    setToSelected(false);
  }, [from]);

  /* BOOK NOW */
  const handleBook = () => {
    if (!from || !to || !date) {
      alert("Please select From, To and Date");
      return;
    }

    if (from === to) {
      alert("From and To cannot be the same");
      return;
    }

    const placeId = "101"; // demo id

    navigate(`/SeatSelection/${placeId}`, {
      state: { from, to, date, travellers }
    });
  };

  const totalTravellers =
    travellers.adults + travellers.children + travellers.infants;

  return (
    <div className="search-wrapper">
      <div className="search-card">
        <div className="bottom-inputs">

          {/* FROM */}
          <div className="box">
            <label>From</label>
            <input
              value={from}
              placeholder="City or airport"
              onChange={(e) => {
                setFrom(e.target.value);
                setFromSelected(false);
              }}
            />

            {fromList.length > 0 && (
              <ul className="dropdown">
                {fromList.map(place => (
                  <li
                    key={place._id}
                    onClick={() => {
                      setFrom(place.name);
                      setFromSelected(true);
                      setFromList([]);
                    }}
                  >
                    {place.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TO */}
          <div className="box">
            <label>To</label>
            <input
              value={to}
              placeholder="City or airport"
              onChange={(e) => {
                setTo(e.target.value);
                setToSelected(false);
              }}
            />

            {toList.length > 0 && (
              <ul className="dropdown">
                {toList
                  .filter(place => place.name !== from)
                  .map(place => (
                    <li
                      key={place._id}
                      onClick={() => {
                        setTo(place.name);
                        setToSelected(true);
                        setToList([]);
                      }}
                    >
                      {place.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* DATE */}
          <div className="box">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* TRAVELLERS */}
          <div
            className="box"
            onClick={() => setOpenTravellers(!openTravellers)}
          >
            <label>Travellers & Class</label>
            <p className="fake-input">
              {totalTravellers} Traveller · {travellers.class}
            </p>
          </div>
        </div>

        <button className="bookbtn" onClick={handleBook}>
          Book Now
        </button>
      </div>
    </div>
  );
}
