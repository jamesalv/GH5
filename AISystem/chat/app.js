const express = require("express");
const app = express();
const chat = require("./geminai");
const cors = require("cors");

app.use(cors({cors:'*'}));
app.use(express.json());

app.post('/',async (req,res)=>{
    try{

        

        const respond = await chat(req.body.input);
        return res.status(200).send({message:respond});
    }
    catch(err){
        return res.status(500).send({message:"server jebluk"});
    }
});

app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`Listening to port ${process.env.PORT}`);
});