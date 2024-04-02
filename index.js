const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const port=process.env.PORT || 4001;
const route=require("./routes/routes")
const connection=require("./config/db");


const app=express();

// middlewears...
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes.............
app.use("/api",route)


app.listen(port, async()=>{
    await connection();
    console.log("server runs fine")
})