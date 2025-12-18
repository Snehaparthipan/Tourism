import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/search.css";
import { useNavigate } from "react-router-dom";
import API from "../Utills/API";

export default function Train() {
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
    class: "Maruti Suzuki"
  });
  useEffect(() => {
    if (!from || fromSelected) {
      setFromList([]);
      return;
    }

    const timer = setTimeout(() => {
      API
        .get(`/train?search=${from}`)
        .then(res => setFromList(res.data))
        .catch(err => console.log(err));
    }, 300);

    return () => clearTimeout(timer);
  }, [from, fromSelected]);

  useEffect(() => {
    if (!to || toSelected) {
      setToList([]);
      return;
    }

    const timer = setTimeout(() => {
      API
        .get(`train?search=${to}`)
        .then(res => setToList(res.data))
        .catch(err => console.log(err));
    }, 300);

    return () => clearTimeout(timer);
  }, [to, toSelected]);

  useEffect(() => {
    setTo("");
    setToList([]);
    setToSelected(false);
  }, [from]);

  const handleBook = () => {
    if (!from || !to ||!date) {
      alert("Please select From and To and date");
      return;
    }

    if (from === to) {
      alert("From and To cannot be the same");
      return;
    }

    navigate("/book", {
      state: { from, to, travellers }
    });
  };

  const totalTravellers =
    travellers.adults + travellers.children + travellers.infants;

  return (
    <div className="search-wrapper">
      <div className="search-card">
        <div className="bottom-inputs">

          
          <div className="box">
            <label>From</label>
            <input
              value={from}
              placeholder="Enter Pickup City"
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
              placeholder="Enter Drop city"
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

          <div className="box">
  <label>Date</label>
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
  />
</div>

<div
                            className="box"
                            onClick={() => setOpenTravellers(!openTravellers)}
                        >
                            <label>Travellers & Class</label>
                            <p className="fake-input">
                                {totalTravellers} Traveller · {travellers.class}
                            </p>

                            {openTravellers && (
                                <div className="traveller-dropdown" onClick={(e) => e.stopPropagation()}>
                                    {/* Adults */}
                                    <div className="row">
                                        <span>Adults</span>
                                        <div className="counter">
                                            <button
                                                onClick={() =>
                                                    setTravellers(p => ({
                                                        ...p,
                                                        adults: Math.max(1, p.adults - 1)
                                                    }))
                                                }
                                            >−</button>
                                            <span>{travellers.adults}</span>
                                            <button
                                                onClick={() =>
                                                    setTravellers(p => ({ ...p, adults: p.adults + 1 }))
                                                }
                                            >+</button>
                                        </div>
                                    </div>

                                    {/* Children */}
                                    <div className="row">
                                        <span>Children</span>
                                        <div className="counter">
                                            <button
                                                onClick={() =>
                                                    setTravellers(p => ({
                                                        ...p,
                                                        children: Math.max(0, p.children - 1)
                                                    }))
                                                }
                                            >−</button>
                                            <span>{travellers.children}</span>
                                            <button
                                                onClick={() =>
                                                    setTravellers(p => ({ ...p, children: p.children + 1 }))
                                                }
                                            >+</button>
                                        </div>
                                    </div>

                                    {/* Infants */}
                                    <div className="row">
                                        <span>Infants</span>
                                        <div className="counter">
                                            <button
                                                onClick={() =>
                                                    setTravellers(p => ({
                                                        ...p,
                                                        infants: Math.max(0, p.infants - 1)
                                                    }))
                                                }
                                            >−</button>
                                            <span>{travellers.infants}</span>
                                            <button
                                                onClick={() =>
                                                    setTravellers(p => ({ ...p, infants: p.infants + 1 }))
                                                }
                                            >+</button>
                                        </div>
                                    </div>

                                    {/* CLASS */}
                                    <div className="class-select">
                                        <label>Class</label>
                                        <select
                                            value={travellers.class}
                                            onChange={(e) =>
                                                setTravellers(p => ({ ...p, class: e.target.value }))
                                            }
                                        >
                                            <option>12-Seater Tempo</option>
                                            <option>9-Seater Tempo</option>
                                            <option>5-Seater Hyundai Creta</option>
                                            <option>4-Seater Maruti Suzuki S</option>
                                            <option>3-Seater Toyota Sienna</option>
                                        </select>
                                    </div>

                                    <button
                                        className="done-btn"
                                        onClick={() => setOpenTravellers(false)}
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>


        <button className="bookbtn" onClick={handleBook}>
          Book Now
        </button>
      </div>
    </div>
  );
}
