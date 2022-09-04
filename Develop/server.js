// these are the required dependencies
const express = require('express');
const path = require('path');
const api = require('./public/assets/js/routes')

//This will start the express app
const app = express();
const PORT = process.env.PORT || 3001;

//This is the middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);
app.use(express.static('public'));

//notes.html GET route
app.get('/notes', (req, res) => {
  if(req){
    console.log('Your request has been received')
  }
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//index.html GET route
app.get('/', (req, res) => {
  if(req){
    console.log('Welcome to the Note Taker App')
  }
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//This will start the server listening
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);