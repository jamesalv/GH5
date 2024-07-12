require("dotenv").config();

async function journal_validate(content){

    data = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({journal_entry:content})
    }

    const result = await fetch(process.env.VALIDATOR_URL,data);
    const respond = await result.json();
    //console.log(respond);
    return respond;
}

module.exports = journal_validate;