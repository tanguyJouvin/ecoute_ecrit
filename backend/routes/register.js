const express = require('express');
const connection = require('../conf');
const shajs = require('sha.js');
const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM ec_users', (err, result) => {
    if (err) { res.sendStatus(400) };
    res.send(result);
  });
});

router.get('/:id', (req, res) => {
  connection.query(`SELECT * FROM ec_users 
    WHERE ec_id = ?`, [req.params.id], (err, result) => {
    if (err) { res.sendStatus(400) };
    res.send(result);
  });
});

//création de l'utilisateur et vérification de l'existence de l'email
router.post('/', (req, res) => {
  const emailCount = `SELECT COUNT(ec_email) AS emailcount FROM ec_users WHERE ec_email = "${req.body.email}"`
  connection.query(emailCount,
  (err, result) => {
    if(err) {
      console.log(err);
      res.sendStatus(403);
    }
    if(result[0].emailcount === 0){
      connection.query(
          `INSERT INTO ec_users (ec_firstname, ec_lastname, ec_address, ec_email, ec_password)
          VALUES ("${req.body.firstname}", "${req.body.lastname}", "${req.body.address}", 
          "${req.body.email}", "${shajs('sha256').update(req.body.password).digest('hex')}")`
        , (err, result) => {
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

//modification de l'utilisateur
router.put('/:id',(req, res) => {
  connection.query(`UPDATE ec_users 
  SET ec_firstname = "${req.body.firstname}", ec_lastname = "${req.body.lastname}", ec_address = "${req.body.address}", ec_email = "${req.body.email}", ec_password = "${req.body.password}"
  WHERE ec_id = ? `, [req.params.id], (err, result) => {
    if(err) { res.sendStatus(400) };
    console.log(result);
    res.sendStatus(200);
  });
});

//suppression d'un utilisateur
router.delete('/:id',(req, res) => {
  connection.query(`DELETE FROM ec_users WHERE ec_id = ?`, [req.params.id], (err, result) => {
    if(err) throw err;
    res.sendStatus(200);
  })
})

module.exports = router;