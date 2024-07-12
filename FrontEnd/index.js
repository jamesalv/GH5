const path = require('path')
const express = require('express');
const axios = require('axios')
const session = require('express-session');
const bodyParser = require('body-parser')
const dirname = path.resolve()
const flash = require('express-flash')

const app = express()
app.use(flash())

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(express.static(path.join(dirname, 'public')));

function checkAuth(req, res, next) { 
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to view this page.');
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {
    // res.sendFile(path.join(dirname, 'public', 'journal_entry.html'))
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/journal', checkAuth, async (req, res) => {
    const userId = req.session.user.id;

    try {
        const response = await axios.get(`http://172.25.116.217:8000/api/journal/${userId}`);
        const journals = response.data;
        console.log(journals);
        res.render('journal', { user: req.session.user, journals });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to fetch journals.');
        res.redirect('/');
    }
})

app.get('/journal_entry', checkAuth, (req, res) => {
    res.render('journal_entry', { user: req.session.user })
})

app.get('/to-user', checkAuth,async (req, res) => {

    // try {
    //     const jobFetch = await axios.get('link')
    //     const videoFetch = await axios.get('link')

    //     const job = jobFetch.data
    //     const video = videoFetch.data

    res.render('user', { user: req.session.user })

    // }catch(err){
    //     res.status(400).send(`err : ${err.message}`)
    // }
})

app.get('/to-login', (req, res) => {
    res.render('login')
})

app.get('/to-services', checkAuth,(req, res) => {
    res.render('services', { user: req.session.user })
})

app.get('/to-jobs', checkAuth,(req, res) => {
    res.render('jobs', { user: req.session.user })
})

app.get('/to-register', (req, res) => {
    res.sendFile(path.join(dirname, 'public', 'register.html'))
})

app.get('/to-course', checkAuth,(req, res) => {
    res.render('course', { user: req.session.user })
})

app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try {
        const login = await axios.post('http://172.25.116.217:8000/api/auth/login', { username, password })
        console.log(login);
        if (login.status === 200) {
            const userData = login.data
            req.session.user = userData.user[0]
            // console.log(req.session.user);
            console.log(userData.user[0]);
            res.render('user', { user: req.session.user })
        }
    } catch (err) {
        res.status(404).send(`error : ${err.message}`)
    }
})

app.post('/register', async (req, res) => {

    const { username, name, age, gender, password } = req.body
    console.log(gender);

    try {
        const newUser = await axios.post('http://172.25.116.217:8000/api/auth/register', { username, name, age, gender, password })
        console.log(username, name, age, gender, password);
        console.log(newUser.status);
        if (newUser.status === 201) {
            res.redirect('/login')
        } else {
            res.status(400).send('registered failed')
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(`error : ${err.message}`)
    }

})

app.post('/send-journal', checkAuth, async (req, res) => {

    const { content } = req.body

    const userId = req.session.user.id;

    try {
        const journal = await axios.post('http://172.25.116.217:8000/api/journal', { userId, content })
        const errorLog = journal.data.error
        if (journal.status === 201) {
            res.redirect('journal')
        }else{
            req.flash('error', `${errorLog}`)
            res.redirect('/journal_entry');
        }
    } catch (err) {
        req.flash('error', 'Journal submission failed !. Please try again !')
        res.status(400).send(`error: ${err.message}`)
        console.log(err);
        req.flash('error', 'An error occurred while submiting your journal')
        res.redirect('/')
    }

})


app.listen(5000, () => {
    console.log('server is running on port 5000');
});