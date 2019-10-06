//const express = require('express')
//const app = express()

const app1 = require('./app');
 
const port = process.env.PORT || 3000;

async function main(){
  await app1.listen(port);
  //res.send('WELCOME MIINCODE API :) ')
  console.log('Server port >>> ' +port);
}

main();
/*
app.get('/', function (req, res) {
  res.send('api Miincode ACTUAL API :) ')
})


app.listen(port, () => {
  console.log("Listening on " +port);
})*/