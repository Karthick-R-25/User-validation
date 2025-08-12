const { hash } = require('bcrypt')
const { text } = require('body-parser')
const mongoose=require('mongoose')

let userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    
    email:{type:String,required:true},
    password:{type:String}
   
})

let UserModel=mongoose.model('usernewdetails1',userSchema)

module.exports=UserModel