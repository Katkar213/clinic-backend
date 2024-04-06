 const bcrypt=require("bcrypt");
 const jwt=require("jsonwebtoken");
 const {UserModel}=require("../models/model");
 const {Appointments}=require("../models/AppointmetSchema");
 const secret_key="shardul";
const {doctorModel}=require("../models/doctorModel")  
// const doctorDataModel=require("../models/doctorDataModel")
// const doctorsData=require("../models/doctorDataModel")

//  registercontroller......................
const registercontroller=async(req,res)=>{
    const data=req.body;

try{
const existinguser=await UserModel.findOne({email:data.email});

if(existinguser){
    res.status(200).send({message:"user already exist",success:true})  
}
else{
    const password=data.password;
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(password,salt);
     data.password=hashpassword;
    await UserModel.create(data);
     res.status(201).send({message:"userRegister Successfully",success:true});
}
}
catch(err){
console.log(err);
res.status(500).send({success:false,message:"error occurs at register component at backend"})
}
}

// loginconrtroller...................
const logincontroller=async(req,res)=>{
    const data=req.body;
    console.log(data,"from login controller");
    try{
       const user= await UserModel.findOne({email:data.email});
console.log(user)
       if(user){
        console.log("user entered")
        const passwordconfirm= await bcrypt.compare(data.password,user.password);
        if(passwordconfirm){
           const token=jwt.sign({email:data.email},secret_key,{expiresIn:'1d'});
          res.status(201).send({message:"user Login in successfully",token,email:user.email,success:true});
        }
        else{
           return res.status(500).send({message:"Password is incorrect",success:false});
        }
       }

       else{
       return res.status(200).send({message:"user not found",success:false});
       }
    }
    catch(err){
        console.log(err);
    }

    
}



// authentication controller...................
const authController=async(req,res)=>{
try{
    console.log(req.body,"from auth controller....")
const user=await UserModel.findOne({email:req.body.email})
user.password=undefined;
console.log(user,"from user controller")
if(!user){
    return res.status(200).send({
        message:"user not found",
        success:false
    })
}
else{
    res.status(200).send({
       
        success:true,
        data:user
    })

   
}
}

catch(err){
console.log(err)
res.status(500).send({
    message:"auth error",
    success:false,
    err
})
}
}


const applyDoctorController=async(req,res)=>{
try{
const newDoctor=await doctorModel({...req.body,status:"pending"});
await newDoctor.save();
const adminUser=await UserModel.findOne({isAdmin:"true"})
const notification =adminUser.notification
notification.push({
    type:"apply-doctor-request",
    message:`${newDoctor.firstName} ${newDoctor.lastName} Has Apply for doctor account`,
    doctorId:newDoctor._id,
    name:newDoctor.firstName + " " +newDoctor.lastName,
    onClickPath:'/admin/doctors'
})



await UserModel.findOneAndUpdate(
    { _id: adminUser._id },
    { $set: { notification: notification } },
    { returnOriginal: false }
  );

  res.status(201).send({
    success:true,
    message:'Doctor Account Applied Successfully'
  })

}
catch(err){
    console.log(err);
    res.status(500).send({
        success:true,
        message:"error while applying as Doctor"
    })
}
}

// notification controller...................
const getAllNotificationController=async(req,res)=>{
try{
    const user=await UserModel.findOne({_id:req.body.userId})
    const  seennotification=user.seennotification
const notification=user.notification
seennotification.push(...notification)
user.notification=[]
user.seennotification=notification
const updateUser=await user.save();
res.status(200).send({
    success:true,
    message:"all notification marked as read",
    data: updateUser,
})


}
catch(err){
console.log(err);
res.status(500).send({
    message:'Error in notification',
    success:false,

})
}
}

// delete all notification................

const deleteAllNotificationController=async(req,res)=>{
try{
const user =await UserModel.findOne({_id:req.body.userId})
user.seennotification=[]
user.notification=[]
const UpdatedUser=await user.save()
UpdatedUser.password=undefined

}
catch(err){
    console.log(err)
}

}





// set doctor-data-to database.....
// const setDoctorData=async(req,res)=>{
//     try{
//         // const data=req.body
//     const response=await doctorsData.find({})
//     res.status(201).send(response)
//     }
//     catch(err){
//         console.log(err)
//     }
   

// }



// book appointment...
const BookAppointment=async(req,res)=>{
    console.log(req.body,"data at appointment")
    try{
        const data=req.body
        console.log(data,"at appointment")
        await Appointments.create(data)
        res.send({
            success:true,
            message:"appointment created"
        })
    }

    catch(err){
        console.log(err)
    }
 
}

// get appointment data.....
const getAppointmentData=async(req,res)=>{
    try{
        const data= await Appointments.find({})
        res.send({
            success:true,
            message:"Appointment fetched",
            data:data
        })
        console.log("hello")
    }
    catch(err){
res.status(500).send({
    success:false,
    message:"error while fetching appointments"
})
    }


}






module.exports={registercontroller,logincontroller, authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController,BookAppointment,getAppointmentData}