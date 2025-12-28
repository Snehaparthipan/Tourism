const express=require("express")
const {postUser,getuser,deleteuser,putUser,flight,postflight}=require("../Controller/Usercontroller")
const {searchPlace, searchHotel, searchCars,searchTrain}=require("../Controller/BookingController")
const{ Register, Loginuser }=require('../Controller/Logincontroller')
const{ getSeats,bookSeats }=require("../Controller/SeatController")
const { getRooms, bookRoom } = require("../Controller/Roomcontroller");
const{VerifyToken}=require("../Middlewere/token")

const router=express.Router()
router.post("/users",postUser)
router.get("/all",getuser)
router.delete("/del/:id",deleteuser)
router.put("/new/:id",putUser)

router.post("/postflight",postflight)
router.get("/flight",flight)


//user route

router.get("/places",searchPlace)
router.get("/hotel",searchHotel)
router.get("/trains",searchTrain)
router.get('/cars',searchCars)

router.post('/register',Register)
router.post('/login',Loginuser)

router.get('/test' , VerifyToken , (req , res)=>{
    res.json({
        message : "Access granted",
        userId : req.user.id
    })
})

//for flight seats

router.get("/seats/:placeId", getSeats);
router.post("/seats/book", VerifyToken, bookSeats);


//for hotal room 

router.get("/rooms/:hotelId", getRooms);
router.post("/rooms/book", bookRoom);


const { getTopDestinations } = require("../Controller/Destinationcontroller")

router.get("/destinations", getTopDestinations)


//for profile 

const {getMyBookings}=require("../Controller/profileController")
router.get("/my-bookings", VerifyToken, getMyBookings);

const Seat = require("../Model/Slot");
const Booking=require("../Model/Booking")
// CANCEL BOOKING
router.delete("/cancel-booking/:id", VerifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // unbook seats
    await Seat.updateMany(
      {
        placeId: booking.placeId,
        seatNumber: { $in: booking.seats }
      },
      { $set: { isBooked: false } }
    );

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Cancel failed" });
  }
});


//for Tour

const { BookTour,getMyTourBookings }=require("../Controller/Explorecontroller")
router.post('/explore',VerifyToken,BookTour)
router.get("/myexplore", VerifyToken, getMyTourBookings);
const { Explore } = require("../Model/Explore");


router.delete("/cancel-tour/:id", VerifyToken, async (req,res) => {
  try {
    const deleteuser=await user.findByIdAndDelete(req.params.id,
                req.body,
                {new:true}
            )
            res.status(200).json({message:"user get from DB",data:deleteuser})
  } catch (err) {
    res.status(500).json({ message: "Cancel failed" });
  }
})


module.exports=router