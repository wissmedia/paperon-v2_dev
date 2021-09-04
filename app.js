// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')
const createError = require('http-errors');

const connectDB = require('./config/db')

// LOAD ENV CONFIG
dotenv.config({ path: './config/config.env' })

// LOAD PASSPORT CONFIG
require('./config/passport')(passport)

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

// METHOD OVERRIDE (to use PUT and DELETE on front-side js)
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// SESSIONS
const maxAge = 60 * 60 * 1000 * 24 // 1 day
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: maxAge,
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

// SET USER AS GLOBAL VARIABLE
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// LOGGER (if on development mode)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

// ROUTES (intermediate)
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

// 404 ERROR PAGE
app.use((req, res) => {
  res.status(404).render('error/404')
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