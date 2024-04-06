const express=require("express");
const authmiddlewear = require("../middlewears/authmiddlewear");
const { getAllDoctorsController, getAllUsersController,ChangeAccountStatusController } = require("../controller/adminCtrl");
const adminroutes=express.Router();



// get all user data

adminroutes.get("/getAllUsers",authmiddlewear,getAllUsersController)

// get all doctors data

adminroutes.get("/getAllDoctors",authmiddlewear,getAllDoctorsController)


// post account status change
adminroutes.post("/changeAccountStatus",authmiddlewear,ChangeAccountStatusController)


module.exports=adminroutes;