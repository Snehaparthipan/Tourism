import Search from "../Components/Search";
import { Routes, Route, Outlet } from "react-router-dom";
import '../CSS/home.css'


export default function Home() {
  return (
    <>
    {/* <Navbar/> */}
    <div className="banner">
      <img
        className="ban"
        src="https://i.postimg.cc/q701gPnC/filip-bunkens-R5Srm-ZPo-O40-unsplash.jpg"
        alt=""
      />

      <div className="title-box">
        <h2 className="quote">Explore the Colourful World</h2>
        <div className="line"></div>
        <button className="ex-btn">Explore</button>
      </div>


      <Search />
      <Outlet/>
    </div>
    </>
  );
}
