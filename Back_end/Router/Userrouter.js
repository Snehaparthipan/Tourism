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
router.post("/seats/book", bookSeats);

//for hotal room 

router.get("/rooms/:hotelId", getRooms);
router.post("/rooms/book", bookRoom);


const { getTopDestinations } = require("../Controller/Destinationcontroller")

router.get("/destinations", getTopDestinations)


module.exports=router