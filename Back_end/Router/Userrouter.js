const express=require("express")
const {postUser,getuser,deleteuser,putUser,flight,postflight}=require("../Controller/Usercontroller")
const {searchPlace, searchHotel, searchCars,searchTrain}=require("../Controller/BookingController")
const{ Register, Loginuser }=require('../Controller/Logincontroller')

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
router.get("/train",searchTrain)
router.get('/cars',searchCars)

router.post('/register',Register)
router.post('/login',Loginuser)

router.get('/test' , VerifyToken , (req , res)=>{
    res.json({
        message : "Access granted",
        userId : req.user.id
    })
})

module.exports=router