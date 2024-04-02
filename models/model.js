const mongoose=require("mongoose");


const mySchema=mongoose.Schema(
    {
        name:String,
        password:String,
        email:String,
        phoneNo:String
    }
)

// register model....
const UserModel=mongoose.model("Users",mySchema);


module.exports={UserModel};