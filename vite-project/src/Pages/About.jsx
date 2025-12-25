import React from 'react'
import Navbar from '../Components/Navbar'
import "../CSS/about.css"
import { FaTag, FaHeadset, FaMapMarkedAlt, FaCalendarCheck } from "react-icons/fa";
import {
  FaSuitcaseRolling,
  FaShieldAlt,
} from "react-icons/fa";
import Testimonials from '../Components/Testimonials';
export default function About() {
  return (
    <div>
      <Navbar/>
      <div className="banner">
      <img
        className="ban"
        src="https://i.postimg.cc/9Fb4fYCJ/benjamin-voros-U-Kty6Hxc-Qc-unsplash.jpg"
        alt=""
      />

      <div className="titleboxabout">
        {/* <h4>welcome back {username} </h4> */}
        <h2 className="quoteforabout">Take a trip around the world together</h2>
        <p className='p'>Find awesome flights, hotel, tour, car and package</p>
        <button className="dis-btn">Discover Now</button>
      </div>
      </div>


      {/* <section className="why-container">
      <h2 className="why-title">Why Choose Us</h2>
      <p className="why-subtitle">
        We provide exceptional service and unforgettable experiences
      </p>

      <div className="why-cards">
        
        <div className="why-card active">
          <FaTag className="why-icon" />
          <h4>Best Price Guarantee</h4>
          <p>
            We match any competitor’s price and beat it by 5%
          </p>
        </div>

        <div className="why-card">
          <FaHeadset className="why-icon" />
          <h4>24/7 Customer Support</h4>
          <p>Our team is always available to help you</p>
        </div>

        <div className="why-card">
          <FaMapMarkedAlt className="why-icon" />
          <h4>Expert Local Guides</h4>
          <p>Experienced guides who know every hidden gem</p>
        </div>

        <div className="why-card">
          <FaCalendarCheck className="why-icon" />
          <h4>Flexible Booking</h4>
          <p>Free cancellation up to 48 hours before departure</p>
        </div>
      </div>
    </section> */}

    <section className="choose-container">
      <h2 className="choose-title">Your Trusted Travel Partner</h2>
      <p className="choose-subtitle">
        We make your travel dreams a reality with personalized services,
        unbeatable prices, and unforgettable experiences.
      </p>

      <div className="choose-grid">
        {/* Left cards */}
        <div className="choose-col">
          <div className="info-card">
            <FaSuitcaseRolling className="info-icon" />
            <h4>Expertly Curated Packages</h4>
            <p>Carefully designed itineraries tailored to your preferences.</p>
          </div>

          <div className="info-card">
            <FaHeadset className="info-icon" />
            <h4>24/7 Customer Support</h4>
            <p>We’re here to assist you anytime, anywhere.</p>
          </div>
        </div>

        {/* Center image */}
        <div className="choose-image">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="Travel"
          />
        </div>

        {/* Right cards */}
        <div className="choose-col">
          <div className="info-card">
            <FaCalendarCheck className="info-icon" />
            <h4>Hassle-Free Booking</h4>
            <p>Easy and secure booking process for peace of mind.</p>
          </div>

          <div className="info-card">
            <FaShieldAlt className="info-icon" />
            <h4>Travel Insurance Included</h4>
            <p>Your safety is our priority with full coverage.</p>
          </div>
        </div>
      </div>
    </section>
    <Testimonials/>
    </div>
  )
}
