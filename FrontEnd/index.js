const path = require('path')
const express = require('express');
const axios = require('axios')
const session = require('express-session');
const bodyParser = require('body-parser')
const dirname = path.resolve()

const app = express()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(express.static(path.join(dirname, 'public')));


app.get('/' , (req,res) => {
    res.sendFile(path.join(dirname, 'public', 'login.html'))
    // res.render('services')
})

app.get('/to-login', (req,res) => {
    res.sendFile(path.join(dirname, 'public', 'login.html'))
})

app.get('/to-register', (req,res) => {
    res.sendFile(path.join(dirname, 'public', 'register.html'))
})

app.post('/login' , async (req,res) => {

    const { username, password} = req.body;

    try{
        const login = await axios.post('http://172.25.116.217:7000/api/auth/login', { username, password })
        console.log(login.data);
        
        if(login.status === 200){
            const userData = login.data
            req.session.user = userData
            res.render('user', {user : req.session.user})
        }
    }catch(err){
        res.status(404).send(`error : ${err.message}`)
    }
})

app.post('/register', async (req,res) => {

    const { username ,name, age, gender, password } = req.body

    try{
        const newUser = await axios.post('http://172.25.116.217:7000/api/auth/register' , {username ,name, age, gender, password})
        console.log(username ,name, age, gender, password);
        console.log(newUser.status);
        if(newUser.status === 201){
            res.redirect('/login')
        }else{
            res.status(400).send('registered failed')
        }

    }catch(err){
        console.log(err);
        res.status(400).send(`error : ${err.message}`)
    }

})


app.listen(5000, () => {
    console.log('server is running on port 5000');
})



