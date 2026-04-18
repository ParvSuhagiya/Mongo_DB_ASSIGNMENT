import app from "./app.js"
import mongoose from "mongoose"
import ConnectDB from "./config/db.js"

// importing the mongoDB connection in the config logic
ConnectDB();

app.listen(3000 , () => {
    console.log("Server Started on the PORT 3000")
})