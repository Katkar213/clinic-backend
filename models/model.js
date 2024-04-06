const mongoose=require("mongoose");


const mySchema=mongoose.Schema(
    {
        name:String,
        password:String,
        email:String,
        phoneNo:String,
        isAdmin:{
            type:String,
            default:false
        },
        isDoctor:{
            type:String,
            default:false
        },
        notification:{
            type:Array,
            default:[]
        },
        seennotification:{
            type:Array,
            default:[]
        }
    }
)



// register model....
const UserModel=mongoose.model("Users",mySchema);



module.exports={UserModel};