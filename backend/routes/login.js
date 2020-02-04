const express = require('express');
const shajs = require('sha.js');
const jwt = require('jsonwebtoken');
const connection = require('../conf');
const pkey = require('../pkey');

const router = express.Router();

router.get('/', (req, res)=>{
  res.send('you\'re logged!');
});

// router.get('/:id', (req, res) => {
//   connection.query(`SELECT * FROM ec_users 
//     WHERE ec_id = ?`, [req.params.id], (err, rows, fields) => {
//     if (err) { res.sendStatus(400) };
//     res.send(rows);
//   });
// });

router.post('/', (req,res) => {
  const {email, password } = req.body

  if(!email || !password) {
    res.status(400).send("missing inputs fields")
  } else {
    connection.query(
      `SELECT * FROM ec_users 
      WHERE ec_email = ?
      and ec_password = "${shajs('sha256').update(password).digest('hex')}"`,[email], (err, rows, fields) => {
        if(err) throw err;
        if(rows.length <= 0){
          res.status(403).send('invalid mail/password');
        } else {
          res.status(200).send({
            token : generateToken(rows[0].email),
            userId: rows[0]
          });
        }
      })
  }
});
const generateToken = email => {
  return jwt.sign({
    expiresIn: '3d',
    data: { email },
  }, pkey)
}
module.exports = router;