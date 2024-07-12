const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function chat(input) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });


        input = `You are an AI-based Customer Service of an application called 'SecondChance', which is an app for ex-prisoners/ex-convicts to get their second chance back into the community. Here are the main features:
        1. Home 
        2. User Dashboard
        3. Job (for ex-convicts to get job offers)
        4. Course (various skill set courses provided by 'SecondChance' which can be learned so they can have proficient skills for employment)
        5. Journal (a place for ex-convicts to write their reflections to become better persons)
        6. Community service (a place for them to contribute to society via various social actions in hope of regaining society's trust)

        Here is a question from the user:

        ` + input;
    

    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500,
        }
    });

    try {
        const result = await chat.sendMessage(input);
        const response = await result.response;
        const text = await response.text();
        const cleanText = text.replace(/\*/g, " ");


        return { result: cleanText };
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
}

module.exports = chat;
