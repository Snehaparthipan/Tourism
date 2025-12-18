const mongoose=require('mongoose')
const loginScema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        minlength:[5,"enter minimum 5 letter"]
    },
    email:{
        type:String,
        require:true,
        unique:true,
        minlength:[5,"enter minimum 5 letter"],
        match:[/^\S+@\S+\.\S+$/]
    },
    password:{
        type:String,
        require:true,
        unique:true,
        minlength:[5,"enter minimum 5 letter"]
    }

})
module.exports=mongoose.model('Login',loginScema)
 