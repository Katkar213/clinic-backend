const {UserModel}=require("../models/model")
const{ doctorModel}=require("../models/doctorModel")


const getAllUsersController=async(req,res)=>{
    try{
const users=await UserModel.find({})
console.log(users,"all data of user getted")
res.status(200).send({
    status:true,
    message:'user Data list',
    data:users,
})
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            message:"user not find",
            success:false
        })
    }
}




const getAllDoctorsController=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:'Doctors Data list',
            data:doctors,
        })
            }
            catch(err){
                console.log(err)
                res.status(500).send({
                    message:"doctors not find",
                    success:false
                })
            }
        
}

// account status
const ChangeAccountStatusController=async(req,res)=>{
try{
    const{doctorId,status}=req.body
    const updatedDoctor = await doctorModel.findOneAndUpdate(
        { _id: doctorId }, 
        { $set: { status: status } }, 
        { new: true }
      );
      const user=await doctorModel.findOne({_id:updatedDoctor._id});
      const notification=user.notification
      notification.push({
        type:"doctor-account-request-updated",
        message:`your account req ${status}`,
        onClickPath:'/notification'
      })
      user.isDoctor==="approve"? "true" :"false"
      await user.save()
      res.status(201).send({
        success:true,
        message:"status approved",
        data:doctors

      })

}
catch(err){
    console.log(err)
}
}



module.exports={getAllUsersController,getAllDoctorsController,ChangeAccountStatusController}