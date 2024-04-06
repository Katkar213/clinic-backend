

const mongoose=require("mongoose");

const AppointmentSchema=mongoose.Schema({
  
    name: String,
    email: String,
    address:String,
    time:String,
    date: String,
    department:String

    


})

const Appointments=mongoose.model("Appointment",AppointmentSchema)

module.exports={Appointments}