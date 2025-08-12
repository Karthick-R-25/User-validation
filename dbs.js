const mongoose=require('mongoose')

function getsetData(){
    mongoose.connect("mongodb://localhost:27017/UserInformation")
    .then(()=>console.log("Database Connected Successfully"))
    .catch(err=>console.log("Something went wrong in DB"))
}

module.exports={getsetData}