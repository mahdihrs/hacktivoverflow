require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const port  = process.env.PORT
const mongoose = require('mongoose')
const cron = require('node-cron');
const indexRouter = require('./routes/index')
const { send } = require('./helpers/nexmoReminder')
const kue = require('kue')
const queue = kue.createQueue()
mongoose.connect('mongodb+srv://mahdihrs:process.env.PASS_ATLAS@projects-a1wq0.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', indexRouter)

let cronOnEveryMonday = '0 9 * * 1'
cron.schedule(cronOnEveryMonday, () => {
    // console.log('running a task every minute');
    send(`
    “A valid answer comes when the question is lived.” 
    
    ― Elizabeth Vongsaravanh
    Raise your point by asking questions and answering another questions.
    `)
});

queue.process('welcome-message', (job, done) => {
    send(`Hello ${job.full_name}! We welcome you to our friendly environment to ask anything and find any information about codes and engineering!`)
    done()
})

// kue.app.listen(3001)

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})