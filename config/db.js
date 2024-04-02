const mongoose=require("mongoose");
const url="mongodb+srv://ketankatkar213:033970@cluster0.ath1q4e.mongodb.net/DoctorApp?retryWrites=true&w=majority";

const connection=async()=>{
    try{
        await mongoose.connect(url)
        console.log("mongoose Connected")
    }
    catch(err){
        console.log("error ocuurs here:",err)
    }

}
module.exports=connection;