const express = require("express");
const router = express.Router();
const {createNewJournal,getAllJournalByUserId} = require("../Model/journalModel");

router.post('/',async (req,res)=>{

    try{
        //cek ke model AI apakah journal sesuai ato tdk
        await createNewJournal(req.body)
        return res.status(200).send({message:`sucessfully create new journal`});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
});

router.get('/:id',async (req,res)=>{

    try{
        const {id} = req.params;
        const journalList = await getAllJournalByUserId(id);
        return res.status(200).send(journalList);
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
});

module.exports = router;