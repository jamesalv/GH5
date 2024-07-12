const mysql2 = require("mysql2/promise");
require("dotenv").config();

async function getConnection(){
    const connection = await mysql2.createConnection({
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE
    });
    return connection;
}

getConnection();

module.exports = getConnection;