import { useLocation } from "react-router-dom";
import "../CSS/search.css"
import { useState } from "react";
export default function Bookhotel() {
  const { state } = useLocation();
  const hotel = state?.hotel;
  const [name,setName]=useState("")
  if (!hotel) return <p className="no-hotel">No hotel selected</p>

  function handleChange(e){
    setName(e.target.value)
    console.log(name)
  }

  return (
    <div className="background">
    <div className="book-wrapper">
      <div className="book-card">
        <h2>Confirm Your Stay</h2>

        <div className="hotel-info">
          <p><span>Hotel</span>{hotel.name}</p>
          <p><span>City</span>{hotel.city}</p>
          <table>
            <tr><td><label>Name</label></td>
            <td><div className="box"><input type="text" name="name" onChange={handleChange}/></div></td></tr>
            <tr></tr><tr></tr>
            <tr><td><label>Contact. No</label></td>
            <td><div className="box"><input type="number"/></div></td></tr>
          </table>
        
        </div>

        <button onClick={()=>alert(`Dear ${name} ${hotel.name} booking successfully`)} className="confirm-btn">
          Confirm Booking
        </button>
      </div>
    </div>
    </div>
  );
}
