const express = require("express");
const router = express.Router();
const {createNewJob,getAllJob} = require("../Model/jobModel");

router.post('/',async (req,res)=>{

    try{
        await createNewJob(req.body)
        return res.status(200).send({message:`sucessfully create new job`});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
});

router.get('/',async (req,res)=>{

    try{
        const jobList = await getAllJob()
        return res.status(200).send(jobList);
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
});

module.exports =router;