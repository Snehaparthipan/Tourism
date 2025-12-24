// Controller/roomController.js
const Room = require("../Model/Room");

/* GET ROOMS BY HOTEL */
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ hotelId: req.params.hotelId });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};

/* BOOK ROOM */
const bookRoom = async (req, res) => {
  const { roomId, rooms } = req.body;

  if (!roomId || !rooms) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const room = await Room.findById(roomId);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  if (room.bookedRooms + rooms > room.totalRooms) {
    return res.status(400).json({ message: "Rooms not available" });
  }

  room.bookedRooms += rooms;
  await room.save();

  res.json({ message: "Room booked successfully" });
};

module.exports = { getRooms, bookRoom };
