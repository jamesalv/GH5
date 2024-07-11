const express = require("express");
const router = express.Router();
const {createNewUser} = require("../Model/userModel")
const login = require("../helper/login")

router.post('/auth/register',async (req,res)=>{
    console.log(req.body);
    try{
        const newUser = {
            name:req.body.name,
            username:req.body.username,
            password:req.body.password,
            age:req.body.age,
            gender:req.body.gender,
        }

        await createNewUser(newUser);
        return res.status(201).send({message:"New User Sucessfully Created"});

    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }

});

router.post('/auth/login',async (req,res)=>{

    try{
        const result = await login(req.body);
        if(result.message!=="OK"){
            return res.status(401).send(result);
        }
        return res.status(200).send(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }

});

module.exports = router;