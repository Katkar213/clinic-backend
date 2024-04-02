 const bcrypt=require("bcrypt");
 const jwt=require("jsonwebtoken");
 const {UserModel}=require("../models/model");
 const secret_key="shardul";

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
    console.log(data);
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
        data:{
            name:user.name,
            email:user.email,
        }
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

module.exports={registercontroller,logincontroller, authController}