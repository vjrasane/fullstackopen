const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan');

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const config = require('./utils/config')

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch(err => {
    console.log(err)
  })

const app = express()

// app.use(express.static('build'));
morgan.token('content', (req) => { return JSON.stringify(req.body) });
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'));

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.token)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
