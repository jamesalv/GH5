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

async function updateUser(user){
    const connection = await getConnection();
    const hashedPassword = await hashPassword(user.password);
    try{
        const SQL = `UPDATE users SET name = ?,username = ?,password = ?,age = ?,gender = ? WHERE id = ?`;
        const statement = [user.name,user.username,hashedPassword,user.age,user.gender,user.id];
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

async function createCourseHistory(userId,courseId){
    const connection = await getConnection();
    try{
        const SQL = `INSERT INTO course_history(userId,courseId) VALUES(?,?)`;
        const statement = [userId,courseId];
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

async function getUserCourseHistoryById(id){
    const connection = await getConnection();
    try{
        const SQL = `UPDATE users SET name = ?,username = ?,password = ?,age = ?,gender = ? WHERE id = ?`;
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

async function updateUserPoint(id,point){
    console.log(`${id} ${point} database`);
    const connection = await getConnection();
    try{
        const SQL = `UPDATE users SET point = ? WHERE id = ?`;
        const statement = [point,id];
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

module.exports = {
    createNewUser,
    getUserByUsername,
    updateUser,
    createCourseHistory,
    getUserCourseHistoryById,
    updateUserPoint
}