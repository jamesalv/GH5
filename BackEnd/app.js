const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/userApi");
const courseRouter = require("./Routes/courseApi");
const authRouter = require("./Routes/authAPI");
const jobRouter = require("./Routes/jobApi");
const journalRouter = require("./Routes/journalApi");
const app = express();

app.use(cors({origin:'*'}));
app.use(express.json())

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/course',courseRouter);
app.use('/api/job',jobRouter);
app.use('/api/journal',journalRouter);

app.get('/',(req,res)=>{
    return res.status(200).send("YOOO");
})

app.listen(3000,"0.0.0.0",()=>{
    console.log("Listening to port 3000");
})