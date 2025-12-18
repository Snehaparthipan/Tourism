const mongoose=require("mongoose")
require("dotenv").config()
async function connectDB() {
    try {
        await mongoose.connect(process.env.STRING)
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}
module.exports= connectDB