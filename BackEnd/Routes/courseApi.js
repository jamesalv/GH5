const express = require("express");
const router = express.Router();
const { createNewCourse,getAllCourse} = require("../Model/courseModel")

router.post('/',async (req,res)=>{

    try{
        await createNewCourse(req.body);
        return res.status(201).send({message:"New Course Sucessfully Created"});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
});

router.get('/',async (req,res)=>{

    try{
        const result = await getAllCourse();
        return res.status(201).send(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
});

module.exports = router;