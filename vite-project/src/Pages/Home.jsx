import Search from "../Components/Search";
import { Routes, Route, Outlet } from "react-router-dom";
import '../CSS/home.css'
import API from "../Utills/API";


export default function Home() {
  async function getName() {
    try {
      await API.get("/register",{
        username
      })
    } catch (error) {
      console.log(error)
    }
  }
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
        <h4 onChange={getName}>welcome back </h4>
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
