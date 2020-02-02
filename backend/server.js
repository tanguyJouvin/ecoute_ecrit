const express = require('express');
const cors = require('cors');
const connection = require('./conf');
// const app = require('./routes/router');
const register = require('./routes/register');
const login = require('./routes//login');

const router = express.Router();

const api = express();

const port = process.env.PORT || 5000;

//Middleware
api.use(cors());
api.use(express.urlencoded({extended: true}));
api.use(express.json());

api.use('/register', register);
api.use('/login', login);

// api.use('./app', app);

connection.connect((err) => {
  if(err) throw err;
  console.log('MySQL is connected !');
});

// api.get('/', (req, res) => {
//   res.send('ok !');
// });

api.listen(port,(err) => {
  if(err) {
    console.log(err);
  } else {
    console.log(`api is running on the ${port}`)
  }
});

