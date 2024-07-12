const express = require("express");
const router = express.Router();
const {createNewJournal,getAllJournalByUserId} = require("../Model/journalModel");
const journal_validate = require("../helper/journal_validator");

router.post('/',async (req,res)=>{

    try{
        const validateJournal = await journal_validate(req.body.content);
        console.log(validateJournal);
        console.log(validateJournal.success);
        if(validateJournal.success !== 'Journal is valid'){
            return res.status(200).send(validateJournal);
        }

        await createNewJournal(req.body)
        return res.status(201).send({message:`sucessfully create new journal`});
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