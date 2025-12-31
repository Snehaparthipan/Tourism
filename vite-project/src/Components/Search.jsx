import { NavLink } from "react-router-dom";
import { MdFlightTakeoff } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";

function Search() {
  return (
    <div className="search-wrapper">
      <div className="search-card1">
        <div className="navdiv">

          <NavLink to="/home" end className="nav">
            <MdFlightTakeoff /> Flights
          </NavLink>

          {/* <NavLink to="/home/hotel" className="nav">
            <FaBuilding /> Hotels
          </NavLink>

          <NavLink to="/home/train" className="nav">
            <FaTrainSubway /> Trains
          </NavLink>

          <NavLink to="/home/car" className="nav">
            <IoCarSport /> Cars
          </NavLink> */}

        </div>
      </div>
    </div>
  );
}

export default Search;
