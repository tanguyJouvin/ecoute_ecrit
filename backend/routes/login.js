const express = require('express');
const shajs = require('sha.js');
const jwt = require('jsonwebtoken');
const connection = require('../conf');
const pkey = require('../pkey');

const router = express.Router();

router.get('/', (req, res)=>{
  res.send('you\'re logged!');
});

//login
router.post('/', (req,res) => {
  connection.query(
    `SELECT * FROM ec_users 
    WHERE ec_email = "${req.body.email}" 
    and ec_password = "${shajs('sha256').update(req.body.password).digest('hex')}"`, (err, result) => {
      if(err) throw err;
      if(result.length <= 0){
        res.send({code: 401});
      } else {
        res.send({
          token : jwt.sign({
            userId: result[0].email
          }, pkey, {
            expiresIn: '3d'
          }),
          code: 200
        });
      }
    })
});

module.exports = router;