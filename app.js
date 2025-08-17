require('dotenv').config()
const express=require('express')
const jwt=require('jsonwebtoken')

const app=express()
const router=express.Router()
const cors=require('cors')
const bodyparser=require('body-parser')
const db=require('./dbs')
const bcrypt=require('bcrypt')
const UserModel=require('./models')
const accesstoken=process.env.AccessToken

db.getsetData()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use(router)




router.get('/',(req,res)=>{
      res.send({greetings:"Welcome to Our Page"})
})
router.post('/register',async(req,res)=>{
   
   
    let name=req.body.name
    let email=req.body.email
    let password=req.body.Password
    console.log(password)
  
    password=(await bcrypt.hash(password,10)).toString()
   

    await UserModel.create({name,email,password})
    
    res.send({message:"successfully register the data"})

})
router.get('/available',async(req,res)=>{
    let userdata=await UserModel.find()
    res.send(userdata)
})
router.post('/login',async(req,res)=>{
     let name=req.body.name
    let email=req.body.email
    let password=req.body.password
    
   
   
    let userdata=await UserModel.findOne({email})
    console.log(password)
    
    const hashedpass=userdata.password
    if(!userdata){
        res.send({message:"User Not Found"})
    }
    const isvalid=async(hashedpass,password)=>{
        console.log(hashedpass)
        console.log(password)
     
        
        const validation=await bcrypt.compare(password,hashedpass)
        return validation
      
       

    }
    console.log(userdata.name)
    let answer=await isvalid(hashedpass,password)
      if(answer){
            console.log(answer)
            const token= jwt.sign({name:userdata.name},accesstoken,{expiresIn:"1h"})
            res.send({token})
             
        }
      else{
        res.status(400).send({message:"Invalid Credentials"})
      }
})
router.post('/authorize',(req,res)=>{
        let token=req.headers['authorization'].split(" ")[1]
        console.log(token)
       
        jwt.verify(token,accesstoken,(err,decoded)=>{
            if(err){
                res.status(400).send({message:"Login Expired"})
            }
            else{
                console.log(decoded)
            res.send({message:`welcome ${decoded.name}`})}
            
        })
})

app.listen(3000,()=>{console.log("Server Successfully Running")})

