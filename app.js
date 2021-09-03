// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')

const connectDB = require('./config/db')

// LOAD ENV CONFIG
dotenv.config({ path: './config/config.env' })

// CREATE EXPRESS APP 
const app = express()
const PORT = process.env.PORT || 80
const HOST = process.env.HOST || '0.0.0.0'

// GLOBAL VARIABLES
app.locals.appNames = {
  title: 'Paperon',
  subtitle: 'Survei dan Kuesioner'
}

// BODY PARSER
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// LOGGER (if on development mode)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

// ROUTES (basic)
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/signin', (req, res) => {
  res.render('auth/signin')
})

// TRY CONNECT TO DB THEN START SERVER
try {
  connectDB().then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server Running on: http://${HOST}/${PORT}`)
    })
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}