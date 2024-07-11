const getConnection = require("./MysqlConnection");
const {hashPassword} = require("../helper/hashing");

async function createNewUser(newUser){
    const connection = await getConnection();
    console.log(newUser);
    try{
        const hashedPassword = await hashPassword(newUser.password);
        const SQL = `INSERT INTO users(name,username,password,age,gender,role,point) VALUES (?,?,?,?,?,?,?)`;
        const statement = [newUser.name,newUser.username,hashedPassword,newUser.age,newUser.gender,"user",0];
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

async function getUserByUsername(username){
    const connection = await getConnection();

    try{
        const SQL = `SELECT * FROM users WHERE username = ?`;
        const statement = [username];
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

module.exports = {createNewUser,getUserByUsername}