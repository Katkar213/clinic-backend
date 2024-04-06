const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const port=process.env.PORT || 4001;
const route=require("./routes/routes")
const connection=require("./config/db");
const adminroutes=require("./routes/adminRoutes")


const app=express();

// middlewears...
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes.............
app.use("/api",route)

app.use("/api",adminroutes)


app.listen(port, async()=>{
    await connection();
    console.log("server runs fine")
})