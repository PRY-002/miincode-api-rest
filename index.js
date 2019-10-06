const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

console.log("Listening on 3000");
app.listen(3000)