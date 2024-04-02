const {data}=require("../data");

const getalldata=(req,res)=>{
    try{
        res.send(data)
        console.log("hello")
    }
    catch(err){
        console.log("error is",err)
    }

}
module.exports={getalldata};


