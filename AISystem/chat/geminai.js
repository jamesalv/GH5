const { GoogleGenerativeAI } = require ("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(){
    const model = genAI.getGenerativeModel({model:"gemini-pro"});

    let history = [
        {
            role:'user',parts:[{text: 'hello how are you?'}]
        },
        {
            parts:[{text:'I am well, thank you.'}], role: 'model'
        }
    ];

    const chat = model.startChat({
        history:history,
        generationConfig:{
            maxOutputTokens:500,
        }
    })

    const prompt = "How how to make ex fried rice?";
    const result = await chat.sendMessage(prompt);
    const respond = await result.response;
    const text = await respond.text();
    console.log(text);
    console.log(history);

    history.forEach(Element=>{
        console.log(Element);
    })
}

run();