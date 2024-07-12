const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post('/',async (req,res)=>{
    data = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({input:req.body.input})
    }

    const result = await fetch(process.env.CHATBOT_URL,data);
    const respond = await result.json();
    //console.log(respond);
    return res.status(200).send({message:respond});
})

module.exports = router;

// async function test(){
//     data = {
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({input:"Are there any way to improve myself?"})
//     }

//     const result = await fetch(process.env.CHATBOT_URL,data);
//     console.log(result);
//     const respond = await result.json();
//     console.log(respond);
// }

// test();