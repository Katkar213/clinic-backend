const express=require("express");
const {getalldata}=require("../controller/controller");
const { registercontroller, logincontroller, authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController,BookAppointment,getAppointmentData} = require("../controller/usetCtrl");
const authmiddlewear = require("../middlewears/authmiddlewear");

const routes=express.Router();

routes.get("/getdata",getalldata);

// register......
routes.post("/register",registercontroller);

// login....
routes.post("/login",logincontroller);

// set all doctors data to mongo
// routes.get("/set-doctor-data",setDoctorData)

// get appointment data
routes.get("/getAppointments",getAppointmentData)


// authentication...............
routes.post("/getUserData",authmiddlewear,authController)

// authentication...............
routes.post("/apply-doctor",authmiddlewear,applyDoctorController)

// notification............
routes.post("/get-all-notification",authmiddlewear,getAllNotificationController);


// delete notification......
routes.post("/delete-all-notification",authmiddlewear,deleteAllNotificationController);

// appointments..
routes.post("/bookAppointment",authmiddlewear,BookAppointment)

module.exports=routes;

