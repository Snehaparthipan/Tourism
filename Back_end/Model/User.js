const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength:[3,"enter min 3 letter"]
    },
    email:{
        type:String,
        require:true,
        unique:true,
        minlength:[5,"enter min 5 letter"],
        match:[/^\S+@\S+\.\S+$/,"plese enter valid email"]
    },
    phoneNo:{
        type:Number,
        require:true,
        unique:true,
        match:[ /^\d{10}$/]
    },
    password:{
        type:String,
        require:true,
        minlength:[6]
    }},
    {timestamps:true}
)
module.exports=mongoose.models.User || mongoose.model('User',userSchema)