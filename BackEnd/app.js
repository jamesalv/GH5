const express = require("express")
const app = express()

app.get('/',(req,res)=>{
    return res.status(200).send("YOOO");
})

app.listen(3000,"0.0.0.0",()=>{
    console.log("Listening to port 3000");
})