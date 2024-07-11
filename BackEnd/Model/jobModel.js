const getConnection = require("./MysqlConnection");

async function createNewJob(newJob){
    const connection = await getConnection();
    //console.log(newUser);
    try{
        const SQL = `INSERT INTO job(title,description,min_point) VALUES (?,?,?)`;
        const statement = [newJob.title,newJob.description,newJob.min_point];
        const [result] = await connection.execute(SQL,statement);
        //console.log(result);
    }
    catch(e){
        return e;
    }
    finally{
        await connection.end();
    }
}

async function getAllJob(){
    const connection = await getConnection();

    try{
        const SQL = `SELECT * FROM job`;
        
        const [result] = await connection.execute(SQL);
        //console.log(result);
        return result;
    }
    catch(e){
        return e;
    }
    finally{
        await connection.end();
    }
}

module.exports = {createNewJob,getAllJob};