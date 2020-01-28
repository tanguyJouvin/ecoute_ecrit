const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // route path on local directory 
const PORT = process.env.PORT || 5000;//server running on this port
require('dotenv').config()
const api =  express();

//MIDDLEWARES
api.use(bodyParser.urlencoded({ extended: false })); //include middleware
api.use(bodyParser.json());

//ROUTES

api.listen(PORT, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log(`Server is running on port: ${port}`);
    
  }
})