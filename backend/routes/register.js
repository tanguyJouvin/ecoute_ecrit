const express = require('express');
const connection = require('../conf');
const shajs = require('sha.js');
const jwt = require('jsonwebtoken');
const pkey = require('../pkey');

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if(typeof req.headers.authorization !== 'undefined'){
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, pkey, (err, user) => {
      if(err) {
        res.status(403).send('Not Authorized');
      }
      req.userEmail = user.data.email
      return next();
    })
  } else {
    res.status(403).send('Not Authorized');
  }
};

router.get('/', isAuthenticated, (req, res) => {
  connection.query(`SELECT ec_firstname, ec_lastname, ec_address, ec_email FROM ec_users 
    WHERE ec_email = "${req.userEmail}"`, (err, rows) => {
      if(err) {
        res.sendStatus(500);
      } 
      if(rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).send('Not Found');
      }
  });
});

router.get('/:id', (req, res) => {
  connection.query(`SELECT * FROM ec_users 
    WHERE ec_id = ?`, [req.params.id], (err, rows, fields) => {
    if (err) { res.sendStatus(400) };
    res.send(rows);
  });
});

//création de l'utilisateur et vérification de l'existence de l'email
router.post('/', (req, res) => {
  const { firstname, lastname, address, email, password } = req.body;

  if(!firstname || !lastname || !address || !email || !password) {
    res.status(400).send('miss input field');  
  } else {
    const emailCount = `SELECT ec_email FROM ec_users WHERE ec_email = "${email}"`
    connection.query(emailCount,
    (err, rows, fields) => {
      if(err) {
        res.sendStatus(400);
        throw err
      } else {
        if(rows.length > 0) {
          res.status(400).send("email already used")
        } else {
          connection.query(
            `INSERT INTO ec_users (ec_firstname, ec_lastname, ec_address, ec_email, ec_password)
            VALUES ("${firstname}", "${lastname}", "${address}", 
            "${email}", "${shajs('sha256').update(password).digest('hex')}")`, 
            (err, rows, fields) => {
              if(err) {
                res.sendStatus(400);
                throw err;
              }
              console.log(rows);
              res.sendStatus(200)
            });
        }
      }
    })
  }
});

//modification de l'utilisateur
router.put('/:id',(req, res) => {

  const { firstname, lastname, address, email, password } = req.body;

  connection.query(`UPDATE ec_users 
  SET ec_firstname = "${firstname}", ec_lastname = "${lastname}", ec_address = "${address}", ec_email = "${email}", ec_password = "${password}"
  WHERE ec_id = ? `, [req.params.id], (err, rows, fields) => {
    if(err) { res.sendStatus(400) };
    console.log(rows);
    res.send(rows);
  });
});

//suppression d'un utilisateur
router.delete('/:id',(req, res) => {
  connection.query(`DELETE FROM ec_users WHERE ec_id = ?`, [req.params.id], (err, rows, fields) => {
    if(err) throw err;
    res.sendStatus(200);
  })
})

module.exports = router;