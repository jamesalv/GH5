const getConnection = require("./MysqlConnection");
const timestamp = require("../helper/timestamp");

async function createNewJournal(newJournal){
    const connection = await getConnection();

    try{
        const SQL = `INSERT INTO journal(userId,time_stamp,content) VALUES (?,?,?)`;
        const statement = [newJournal.userId,timestamp(),newJournal.content];
        const [result] = await connection.execute(SQL,statement);
 
    }
    catch(e){
        return e;
    }
    finally{
        await connection.end();
    }
}

async function getAllJournalByUserId(id){
    const connection = await getConnection();

    try{
        const SQL = `SELECT journal.time_stamp,journal.content FROM journal
            JOIN users ON journal.userId = users.id WHERE users.id = ?`;
        const statement = [id];
        const [result] = await connection.execute(SQL,statement);

        return result;
    }
    catch(e){
        return e;
    }
    finally{
        await connection.end();
    }
}

module.exports = {createNewJournal,getAllJournalByUserId};