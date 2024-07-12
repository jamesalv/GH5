const {createNewHistory,updateHistory,getHistoryById} = require("./model/mongodb");
const chat = require("./geminai");

async function process(body){
    const getHistory = await getHistoryById(body);
    let history = [];
    if(getHistory === null){
        await createNewHistory(body.id);
    }
    else{
        const getHistory = await getHistoryById(body.id);
        history = getHistory.history;
    }

    const result = await chat(history,"I just came out from jail, do you have any suggestion what should i do?");
    console.log(result);
}

async function test(){
    let history = [];
    const result = await chat(history,"I just came out from jail, is there still a place for me?");
    console.log(result);
    history = [...result.history];

    console.log("===============");

    const result1 = await chat(history,"I just came out from jail, is there still a place for me?");
    console.log(result1);
    history = [...result1.history];

    console.log(history);
}

test();