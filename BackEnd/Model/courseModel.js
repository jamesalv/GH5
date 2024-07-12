const getConnection = require("./MysqlConnection");

async function createNewCourse(newCourse){
    const connection = await getConnection();
    //console.log(newUser);
    try{
        const SQL = `INSERT INTO course(name,url,description,point) VALUES (?,?,?,?)`;
        const statement = [newCourse.name,newCourse.url,newCourse.description,newCourse.point];
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

async function getAllCourse(){
    const connection = await getConnection();

    try{
        const SQL = `SELECT * FROM course`;
        
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

async function getCourseById(id){
    const connection = await getConnection();

    try{
        const SQL = `SELECT * FROM course WHERE id = ?`;
        
        const statement = [id];
        const [result] = await connection.execute(SQL,statement);
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

module.exports = {createNewCourse,getAllCourse,getCourseById};