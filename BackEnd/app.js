const express = require("express")
const cors = require("cors")
const router = require("./Routes/userApi")
const app = express()


app.use(cors({origin:'*'}));
app.use(express.json())
app.use('/api',router);

app.get('/',(req,res)=>{
    return res.status(200).send("YOOO");
})

app.listen(3000,"0.0.0.0",()=>{
    console.log("Listening to port 3000");
})