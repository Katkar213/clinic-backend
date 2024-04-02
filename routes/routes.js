const express=require("express");
const {getalldata}=require("../controller/controller");
const { registercontroller, logincontroller, authController} = require("../controller/usetCtrl");
const authmiddlewear = require("../middlewears/authmiddlewear");

const routes=express.Router();

routes.get("/getdata",getalldata);

// register......
routes.post("/register",registercontroller);

// login....
routes.post("/login",logincontroller);


// authentication...............
routes.post("/getUserData",authmiddlewear,authController)



module.exports=routes;