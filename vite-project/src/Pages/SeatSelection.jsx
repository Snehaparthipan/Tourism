import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Utills/API";

function SeatSelection() {
  const { id } = useParams()
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!id) return;

    API.get(`/seats/${id}`)
      .then(res => setSeats(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;

    setSelected(prev =>
      prev.includes(seat.seatNumber)
        ? prev.filter(s => s !== seat.seatNumber)
        : [...prev, seat.seatNumber]
    );
  };

  const bookSeats = async () => {
    try {
      await API.post("/seats/book", {
        showId: id,
        seats: selected
      });

      alert("Booking successful");
      setSelected([]);

      const res = await API.get(`/seats/${id}`);
      setSeats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Select Seats</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,60px)", gap: "10px" }}>
        {seats.map(seat => (
          <button
            key={seat._id}
            onClick={() => toggleSeat(seat)}
            disabled={seat.isBooked}
            style={{
              background: seat.isBooked
                ? "gray"
                : selected.includes(seat.seatNumber)
                ? "green"
                : "white"
            }}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>

      <br />
      <button onClick={bookSeats} disabled={!selected.length}>
        Confirm Booking
      </button>
    </div>
  );
}

export default SeatSelection;
