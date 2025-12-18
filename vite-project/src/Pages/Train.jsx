import React from 'react'
import axios from "axios";
import "../CSS/search.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Train() {

    const navigate = useNavigate();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [fromList, setFromList] = useState([]);
    const [toList, setToList] = useState([]);

    const [openTravellers, setOpenTravellers] = useState(false);
    const [travellers, setTravellers] = useState({
        adults: 1,
        children: 0,
        infants: 0,
        class: "UR/General"
    });


    useEffect(() => {
        if (!from) return setFromList([]);
        const timer = setTimeout(() => {
            axios
                .get(`http://localhost:5000/api/places?search=${from}`)
                .then(res => setFromList(res.data));
        }, 300);
        return () => clearTimeout(timer);
    }, [from]);


    useEffect(() => {
        if (!to) return setToList([]);
        const timer = setTimeout(() => {
            axios
                .get(`http://localhost:5000/api/places?search=${to}`)
                .then(res => setToList(res.data));
        }, 300);
        return () => clearTimeout(timer);
    }, [to]);


    const handleBook = () => {
        if (!from || !to) {
            alert("Please select From & To");
            return;
        }

        navigate("/book", {
            state: {
                from,
                to,
                travellers
            }
        });
    };

    const totalTravellers =
        travellers.adults + travellers.children + travellers.infants;
    return (
        <div>
            <div className="search-wrapper">
                <div className="search-card">
                    {/* INPUTS */}
                    <div className="bottom-inputs">
                        {/* FROM */}
                        <div className="box">
                            <label>From</label>
                            <input
                                value={from}
                                placeholder="city or station"
                                onChange={(e) => setFrom(e.target.value)}
                            />
                            {fromList.length > 0 && (
                                <ul className="dropdown">
                                    {fromList.map(place => (
                                        <li
                                            key={place._id}
                                            onClick={() => {
                                                setFrom(place.name);
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
                                placeholder="city or station"
                                onChange={(e) => setTo(e.target.value)}
                            />
                            {toList.length > 0 && (
                                <ul className="dropdown">
                                    {toList.map(place => (
                                        <li
                                            key={place._id}
                                            onClick={() => {
                                                setTo(place.name);
                                                setToList([]);
                                            }}
                                        >
                                            {place.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                        <div className='box'>
                            <input type="date" />
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
                                            <option>UR/General</option>
                                            <option>Second Seater (2S)</option>
                                            <option>Sleeper Class (SL)</option>
                                            <option>AC Chair Car (CC):</option>
                                            <option>3rd AC (3A/3E)</option>
                                            <option>2nd AC (2A)</option>
                                            <option>1st AC (1A)</option>
                                            <option>Executive Chair Car (EC)</option>
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

                    {/* BOOK */}
                    <button className="bookbtn" onClick={handleBook}>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}
