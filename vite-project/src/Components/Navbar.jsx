import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/nav.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="navleft">
        <table>
          <tbody>
            <tr>
              <td>
                <img
                  src="https://i.postimg.cc/fWxcX2ZC/Untitled-design-removebg-preview.png"
                  height={70}
                  alt="logo"
                />
              </td>
              <td>
                <h2 className="logo">VISTA TRIP</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Center */}
      <div className={`navcenter ${open ? "open" : ""}`}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/destination">Destinations</Link>
        <Link to="/gallery">Gallery</Link>
      </div>

      {/* Right */}
      <div className="navright">
        {/* Profile Dropdown */}
        <div
          className="profile-wrapper"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <div className="profile-circle">
            P
          </div>

          {profileOpen && (
            <div className="profile-dropdown">
              <Link className="profilelink" to="/profile">My Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
