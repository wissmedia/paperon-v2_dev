// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')
const dotenv = require('dotenv')

// LOAD ENV CONFIG
dotenv.config({path: './config/config.env'})

// CREATE EXPRESS APP 
const app = express()
const PORT = process.env.PORT || 2021

// ROUTES (basic)
app.get('/', (req, res) => {
  res.send('its work')
})

app.listen(PORT, () => { console.log(`Server Running on port ${PORT}`) })