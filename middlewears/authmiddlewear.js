const jwt=require("jsonwebtoken");
const secret_key="shardul";

const authmiddlewear=async(req,res,next)=>{
const token=req.headers['authorization'].split(" ")[1]
console.log(req.headers)
console.log(req.body,"from 2")
jwt.verify(token,secret_key,(err,decode)=>{

    try{
        if(err){
            return res.status(200).send({
                message:'authentication failed',
                success:false
            })
        }
        else{
            console.log(decode,"decoded token...")
            req.body.email=decode.email
            next()
        }
    }
    catch(err){
        console.log(err);
        res.status(401).send({
            message:"Auth failed",
            success:false 
        })

    }


})
}




module.exports=authmiddlewear;
