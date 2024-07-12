const express = require("express");
const router = express.Router();
const {updateUser,createCourseHistory,getUserCourseHistoryById,updateUserPoint} = require("../Model/userModel")

router.put('/',async (req,res)=>{

    try{
        await updateUser(req.body)
        return res.status(200).send({message:`sucessfully update user by id ${req.body.id}`});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
});

router.put('/:id/update-point',async (req,res)=>{
    try{
        const {id} = req.params;
        console.log(`${id} ${req.body.point} database`);
        await updateUserPoint(id,req.body.point);
        return res.status(200).send({message:`sucessfully update user point`});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
})

router.post('/:id/course-history',async (req,res)=>{
    try{
        const {id} = req.params;
        await createCourseHistory(id,req.body.courseId)
        return res.status(200).send({message:`sucessfully create new course history`});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
})

router.get('/:id/course-history',async (req,res)=>{
    try{
        const {id} = req.params;
        const courseHistory = await getUserCourseHistoryById(id)
        return res.status(200).send(courseHistory);
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
})

module.exports = router;