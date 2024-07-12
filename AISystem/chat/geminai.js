const { GoogleGenerativeAI } = require ("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function chat(input){
    const model = genAI.getGenerativeModel({model:"gemini-pro"});

    // let history = [
    //     {
    //         role:'user',parts:[{text: 'hello how are you?'}]
    //     },
    //     {
    //         parts:[{text:'I am well, thank you.'}], role: 'model'
    //     }
    // ];

    const chat = model.startChat({
        history:[],
        generationConfig:{
            maxOutputTokens:500,
        }
    })

    input = `Your are a Ai based Costumer Service of application called 'SecondChance', which is a app for
        ex-prisoner/ex-convict to get their second chance back to community. Here are the main feature
        1. Home 
        2. User Dashboard
        3. Job (for ex-convict to get job offer)
        4. Course (a various skill set course provided by 'SecondChance' which can be learn so they can have a proficient skills for them to get to work again)
        5. Journal (a place for ex-convict to write their reflection so they can be a better person)
        6. Community service (a place for them to contribute to society via various social actions in hope to gaining back their trust in society)

        and here are question from user:

        ` + input;

    //const prompt = "How how to make ex fried rice?";
    const result = await chat.sendMessage(input);
    const respond = await result.response;
    //console.log(respond);
    const text = await respond.text();
    const cleanText = text.replace(/\*/g," ");
    //console.log(cleanText);
    return cleanText;
//     console.log(text);
//     console.log(history);

//     history.forEach(Element=>{
//         console.log(Element);
//     })
}

module.exports = chat;