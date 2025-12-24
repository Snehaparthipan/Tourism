import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Flight from "./Pages/Flight"
import Hotals from "./Pages/Hotals"
import Train from "./Pages/Train"
import Cars from "./Pages/Cars"
import Bookhotel from "./Pages/Bookhotel"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import About from "./Pages/About"
import Tour from "./Pages/Tour"
import Profile from "./Pages/Profile"
import './App.css'
import SeatSelection from "./Pages/SeatSelection"

function App() {
  return (
    <div className="body">
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/home" element={<Home />}>
          <Route index element={<Flight />} />
          <Route path="hotel" element={<Hotals />} />
          <Route path="train" element={<Train />} />
          <Route path="car" element={<Cars />} />
          <Route path="book" element={<Bookhotel />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/bookhotel" element={<Bookhotel/>}/>
        <Route path="/SeatSelection/:placeId" element={<SeatSelection />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
