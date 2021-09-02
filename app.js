// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')

// LOAD ENV CONFIG
dotenv.config({ path: './config/config.env' })

// CREATE EXPRESS APP 
const app = express()
const PORT = process.env.PORT || 2021

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

app.listen(PORT, () => { console.log(`Server Running on port ${PORT}`) })