const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const PostRouter = require('./routers/post')

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/workshop'
const port = process.env.PORT || 3000

mongoose.connect(mongoUri)

app.use(cors())

app.use(bodyParser.json())

app.use('/api/posts', PostRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))