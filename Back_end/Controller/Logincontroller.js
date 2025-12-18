const Login=require('../Model/Login')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const Register=async (req,res) => {
    try {
        const {username,email,password}=req.body
        if(!username || !email ||!password)return res.status(401).json({message:"All fields are required"})
            const oldName=await Login.findOne({username})
        if(oldName)return res.status(401).json({message:"name already exists"})
            const oldEmail=await Login.findOne({email})
        if(oldEmail)return res.status(401).json({message:"Email already exists"})
            const hashedpassword=await bcrypt.hash(password,10)
        const newuser=await Login.create({username,email,password:hashedpassword})
        res.status(200).json({message:"user Registered successfully",Login:{
            id:newuser._id,
            username:newuser.username,
            email:newuser.email
        }})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}


// for login

const Loginuser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" })
    }

    const user = await Login.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid pass" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '10d' }
    )

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
}


module.exports={Register,Loginuser}