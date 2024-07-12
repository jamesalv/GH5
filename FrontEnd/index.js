const path = require('path')
const express = require('express');
const axios = require('axios')
const session = require('express-session');
const bodyParser = require('body-parser')
const dirname = path.resolve()
const flash = require('express-flash')
const cors = require("cors")
require("dotenv").config();


const app = express()
app.use(cors({origin:'*'}));
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
    return res.render('login');
})

app.get('/journal', checkAuth, async (req, res) => {
    const userId = req.session.user.id;

    try {
        const response = await axios.get(`https://backend2.wisnuputra.xyz/api/journal/${userId}`);
        const journals = response.data;
        //console.log(journals);
        return res.render('journal', { user: req.session.user, journals });
    } catch (err) {
        //console.error(err);
        req.flash('error', 'Failed to fetch journals.');
        return res.redirect('/');
    }
})

app.get('/journal_entry', checkAuth, (req, res) => {
    res.render('journal_entry', { user: req.session.user })
})

app.get('/to-user', checkAuth, async (req, res) => {

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

app.get('/to-services', checkAuth, (req, res) => {
    res.render('services', { user: req.session.user })
})

app.get('/to-jobs', checkAuth, async (req, res) => {

    try {
        const jobs = await axios.get('https://backend2.wisnuputra.xyz/api/job')
        const jobsResponse = jobs.data;
        res.render('jobs', { user: req.session.user, jobs: jobsResponse })
    } catch (err) {
        res.status(400).send(`${err.message}`)
    }

})

app.get('/to-register', (req, res) => {
    res.sendFile(path.join(dirname, 'public', 'register.html'))
})

app.get('/to-course', checkAuth, async (req, res) => {
    try {
        const course = await axios.get('https://backend2.wisnuputra.xyz/api/course');
        const data = course.data;
        res.render('course', { user: req.session.user, courses: data })
    } catch (err) {
        res.status(400).send(`${err}`)
    }

})

app.get('/course-track', (req, res) => {

    const courseId = req.query.courseId

    console.log(courseId);

    res.redirect(`/course-track/${courseId}`)

})

app.get('/course-track/:courseId', async (req, res) => {

    const courseId = req.params.courseId
    //console.log(courseId);

    try {
        const course = await axios.get(`https://backend2.wisnuputra.xyz/api/course/${courseId}`)
        //console.log(course.data[0]);
        const obj1 = course.data[0];
        res.render('coursetrack', { course: obj1 })
    } catch (err) {
        res.status(400).send(`${err.message}`)
    }

})

app.get('/to-chat', checkAuth, (req, res) => {
    res.sendFile(path.join(dirname, 'public', 'chatbot.html'))
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    try {
        const login = await axios.post('https://backend2.wisnuputra.xyz/api/auth/login', { username, password })
        //console.log(login);
        if (login.status === 200) {
            const userData = login.data
            req.session.user = userData.user[0]
            // console.log(req.session.user);
            //console.log(userData.user[0]);
            res.render('user', { user: req.session.user })
        }
    } catch (err) {
        res.status(404).send(`error : ${err.message}`)
    }
})

app.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, name, age, gender, password } = req.body
    console.log(gender);

    try {
        const newUser = await axios.post('https://backend2.wisnuputra.xyz/api/auth/register', { username, name, age, gender, password })
        //console.log(username, name, age, gender, password);
        //console.log(newUser.status);
        if (newUser.status === 201) {
            res.redirect('/login')
        } else {
            res.status(400).send('registered failed')
        }
    } catch (err) {
        //console.log(err);
        res.status(400).send(`error : ${err.message}`)
    }

})

app.post('/updatePoint', checkAuth, async (req, res) => {

    const userId = req.session.user.id;
    let userPoint = req.session.user.point
    console.log(userId, userPoint);

    const CoursePoint = req.body.Coursepoint;
    const intPoint = parseInt(CoursePoint)

    console.log(CoursePoint);
    try {
        userPoint = userPoint + intPoint
        req.session.user.point = userPoint
        //console.log(userPoint);
        const newPoint = await axios.put(`https://backend2.wisnuputra.xyz/api/user/${userId}/update-point`, { point: userPoint })
        //console.log(newPoint.status);
        res.redirect('/to-course');
    } catch (err) {
        res.status(400).send(`${err.message}`)
    }

})

app.post('/volunteerPoint', async (req, res) => {

    const userId = req.session.user.id;
    let userPoint = req.session.user.point
    //console.log(userId, userPoint);

    const vPoint = 25;

    //console.log(vPoint);
    
    try {
        userPoint = userPoint + vPoint
        req.session.user.point = userPoint
        //console.log(userPoint);
        const newPoint = await axios.put(`https://backend2.wisnuputra.xyz/api/user/${userId}/update-point`, { point: userPoint })
        //console.log(newPoint.status);
        res.redirect('/to-user');
    } catch (err) {
        res.status(400).send(`${err.message}`)
    }


})

app.post('/send-journal', checkAuth, async (req, res) => {

    const { content } = req.body

    const userId = req.session.user.id;
    const userPoint = req.session.user.point
    //console.log(userPoint + 'ini point');
    try {
        const journal = await axios.post('https://backend2.wisnuputra.xyz/api/journal', { userId, content })
        const errorLog = journal.data.error
        //console.log(journal);
        if (journal.status === 201) {
            try {
                // const currentPoints = userPoint
                // currentPoints = currentPoints + 5
                const plusPoint = userPoint + 5
                //console.log(plusPoint);
                req.session.user.point = plusPoint
                const newPoint = await axios.put(`https://backend2.wisnuputra.xyz/api/user/${userId}/update-point`, { point: plusPoint })
                //console.log(`Users point updated to ${req.session.user.point}`);
                //console.log(newPoint);
                res.redirect('/journal')
            } catch (err) {
                //console.log(err);
                req.flash('error', `${err}`)
            }
        } else {
            req.flash('error', `${errorLog}`)
            res.redirect('/journal_entry');
        }
    } catch (err) {
        req.flash('error', 'Journal submission failed !. Please try again !')
        res.status(400).send(`error: ${err.message}`)
        //console.log(err);
        req.flash('error', 'An error occurred while submiting your journal')
        res.redirect('/')
    }
})

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`server is running on port  ${process.env.PORT}`);
});