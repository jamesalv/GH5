const {getUserByUsername} = require("../Model/userModel")
const {compareHash} = require("./hashing")

async function login(body){

    const user = await getUserByUsername(body.username);

    if(user[0] === undefined)
        return {message:"User doesn't Exist"};

    const plainPassword = body.password;
    const hashedPassword = await user[0].password;

    const isTrue = await compareHash(plainPassword,hashedPassword);
    //console.log(isTrue);

    if(!isTrue){
        return {message:"Password Incorrect"}
    }
    else{
        return {
            message:"OK",
            user:user
        }
    }
}

module.exports = login;