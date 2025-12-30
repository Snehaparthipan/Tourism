import React from "react";
import "../CSS/Footer.css"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-outer">
      <div className="footer-card">
        {/* LEFT */}
        <div className="footer-left">
          <h2 className="footer-logo">VISTA<span>TR</span>IP</h2>
          <p>
            Empowering travelers with unforgettable journeys and curated
            tourism experiences around the world.
          </p>

          <div className="socials">
            <span>𝕏</span>
            <span>in</span>
            <span>◎</span>
            <span>f</span>
          </div>

          <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            ↑ BACK TO TOP
          </button>
        </div>

        {/* CENTER */}
        <div className="footer-links">
          <h4>Site Map</h4>
          <ul>
            <li><Link className="navlink" to="/home">Home</Link></li>
            <li><Link className="navlink" to="/about">About</Link></li>
            <li><Link className="navlink" to="/destination">Destinations</Link></li>
            <li><Link className="navlink" to="/gallery">Gallery</Link></li>
           
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
            <li>Disclaimer</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © 2025 Tourism Booking Platform. All rights reserved.
      </div>
    </footer>
  );
}
