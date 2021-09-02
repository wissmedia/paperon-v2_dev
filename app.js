// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')

// CREATE EXPRESS APP 
const app = express()

// ROUTES (basic)
app.get('/', (req, res) => {
  res.send('its work')
})

app.listen(2021, () => { console.log('Server Running...') })