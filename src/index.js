import express from "express";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{

});

app.listen(3000,()=>{
    console.log("app is running on port 3000...");
})