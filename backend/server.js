const express = require('express');
const cors = require('cors');
const sha256 = require('sha256');
const api = express();
const connection = require('./conf');

const port = process.env.PORT || 5000;

//Middleware
api.use(cors());
api.use(express.urlencoded({extended: true}));
api.use(express.json());



connection.connect((err) => {
  if(err) throw err;
  console.log('MySQL is connected !');
  
});
api.get('/', (req, res) => {
  res.send('ok !');
});

//création de l'utilisateur et vérification de l'existence de l'email
api.post('/register', (req, res) => {

  const emailCount = `SELECT COUNT(ec_email) AS emailcount FROM ec_users WHERE ec_email = "${req.body.email}"`

  connection.query(emailCount,
  (err, result) => {
    if(err) {
      console.log(err);
      res.sendStatus(403);
    }
    if(result[0].emailcount === 0){
      connection.query(`INSERT INTO ec_users (ec_firstname, ec_lastname, ec_address, ec_email, ec_password)
        VALUES ("${req.body.firstname}", "${req.body.lastname}", "${req.body.address}", "${req.body.email}", "${sha256(req.body.password)}")`
        ,(err, result) => {
        if(err) {
          console.log(err);
          res.sendStatus(403);
        } else {
          res.sendStatus(200);
        }
      })
    } else {
      res.send("email already used");
    }
  })
});


api.listen(port,(err) => {
  if(err) {
    console.log(err);
  } else {
    console.log(`api is running on the ${port}`)
  }
})