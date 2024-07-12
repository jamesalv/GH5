const {MongoClient} = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.DB_URL);

async function createNewHistory(id){
    try{
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.DB_COLLECTION);

        const newHistory = {
            id:id,
            history:[]
        };
        
        await collection.insertOne(newHistory);
        return "sucessfully create new history"
    }
    catch(e){
        return e;
    }
}

async function updateHistory(id,newElement){
    try{
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.DB_COLLECTION);
        
        await collection.updateOne(
            {id:id},
            {$push:{history: newElement}}
        );
        return "sucessfully create new history"
    }
    catch(e){
        return e;
    }
}

async function getHistoryById(id){
    try{
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.DB_COLLECTION);
        
        const result = await collection.findOne({id:id});
        //console.log(result.histiry);
        return result;
    }
    catch(e){
        return e;
    }
}

module.exports = {createNewHistory,updateHistory,getHistoryById};