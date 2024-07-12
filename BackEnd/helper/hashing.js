const {hash,compare} = require("bcrypt");
const salt = 10;

async function hashPassword(plainPassword){
    return await hash(plainPassword,salt);
}

async function compareHash(plainPassword,HashedPassword){
    return await compare(plainPassword,HashedPassword);
}

module.exports = {hashPassword,compareHash}