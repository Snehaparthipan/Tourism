import React, { useState } from "react"
import { Link,useNavigate } from "react-router-dom";
import Home from "../Pages/Home";
import '../CSS/nav.css'

function Navbar(){
  const [open, setOpen] = useState(false);
  const navigate=useNavigate()
  const handlelogout=()=>{
    localStorage.clear();
    navigate("/")
  }

  return (
    <>
      <nav className="navbar">
        <div className="navleft">
          <table><tbody><tr><td><img src="https://i.postimg.cc/fWxcX2ZC/Untitled-design-removebg-preview.png" height={100} alt="" /></td><td><h2 className="logo" style={{ fontFamily: "-apple-system" }}>VISTA TRIP</h2></td></tr></tbody></table>
        </div>
        <nav className={`navcenter ${open ? "open" : ""}`}>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/tour">Destinations</Link>
          <Link to="/tour">Gallary</Link>
        </nav>

        <div className="navright">
          <button className="logbtn" onClick={handlelogout}>Logout</button>
          <button className="logbtn"><Link to="/profile">profile</Link></button>
          <div className="hamburger" onClick={() => setOpen(!open)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar
