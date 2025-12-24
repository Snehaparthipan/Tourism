import Search from "../Components/Search";
import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import '../CSS/home.css'
import API from "../Utills/API";
import Navbar from "../Components/Navbar"
import TopDestinations from "../Components/TopDestinations";
import PopularPackage from "../Components/PopularPackage";


export default function Home() {
   const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      setUsername(user.username);
    }
  }, []);  
  return (
    <>
    <Navbar/>
    <div className="banner">
      <img
        className="ban"
        src="https://i.postimg.cc/q701gPnC/filip-bunkens-R5Srm-ZPo-O40-unsplash.jpg"
        alt=""
      />

      <div className="title-box">
        {/* <h4>welcome back {username} </h4> */}
        <h2 className="quote">Explore the Colourful World</h2>
        <div className="line"></div>
        <button className="ex-btn">Explore</button>
      </div>


      <Search />
      <Outlet/>
      <TopDestinations/>
      <PopularPackage/>
    </div>
    </>
  );
}
