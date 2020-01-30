const express = require('express');
const cors = require('cors');
const shajs = require('sha.js');
const jwt = require('jsonwebtoken');
const connection = require('./conf');

const api = express();


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
      connection.query(
          `INSERT INTO ec_users (ec_firstname, ec_lastname, ec_address, ec_email, ec_password)
          VALUES ("${req.body.firstname}", "${req.body.lastname}", "${req.body.address}", 
          "${req.body.email}", "${shajs('sha256').update(req.body.password).digest('hex')}")`
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

//login
api.post('/login', (req,res) => {
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

api.listen(port,(err) => {
  if(err) {
    console.log(err);
  } else {
    console.log(`api is running on the ${port}`)
  }
})

const pkey = "9FbDCmcwLc69xaCzN3E5KoFmm5W+mEL9WMuaRivl8R77exWajKNkUsoCvSFF4ST/XYs6yPS3J/bWyQkDH8kghWDv8rlhkfoydpQDyq4yV4S22GmTGGAUPSNFMBqAWzDXi74ze6UsC6/vD89uwcJUBh/ITt9y8LJWl2gSU1x85E4mBS+8vnyQaOZac+YixRL/MevKW2rkRGXjY9j2Cf9uCkGSL9u+FFTSSPOSrXjzXXNvzoxvbXMnusm3wunYt9D6nAkyL1PVhKEfbr5TF1BhyhmGO8NQfs6Y2D7QxJy9jmbIsafnFtN9LolRa5jIVv7EueY1kSnLoJjzLz6iFnOrW4II14XLH+9JZzFtD2FSfnbKACek4gSo8U+bmdKA4fYrK8n10wDlk0tmtD4poRTBDjIlPIWkZSQEV6o/RrJQSp/beq3sg/xIhZPJ9VpFD0pfjsd7IYEE++pxhq8PUg+aju+Ygt5LKM5R2GssAKPuvfmzQ8M9WuQkCJxHDR0bN1/OiNyRdyQZg9Jp3SFHqyc45jJiXKlJc1GbQWLzqxMMKHQbN3fo9gNbPaZd4WievP1tRaORV/sO8GNQw2cNbdZy5F7bFCXy+8qWxHxEBMzW3cI1IxErd+93spflYryOyMDdsdbmphiqF2N5yiYnBDHU9fhtGQIqaS6rcUyHysm8emL9B9VXe8Qtwl0JjbevtMd1TumwIL4zhlvGb+uAt1c8bynv6pG18vRq+ioKIxvt0YiEGG3csnWycjPnnBHzJrfQfxtKdb9H2K5JDMKnMuevyGJvBRYi8Av2LKr1SiFEicvjfBjbXVV38jFN/q+RvqFAjEE8z9gKr3g4SAfe16ZCUBQvX3w0MaTEENnMUZYBP5l3ZBHYJhMco+0Mv2seLx95owUVDQpoG7NuJnKxXqEKH+PUodNtdd+/aAS1vM3ljig7lUPRzLqbwDuTpBKWIceNM3D1PpgofR4+RRjqaCk1lapwfu5r8e8T7H23vUEf/9Kfos19cmegZ5Yvex21SCkQ0kxAkrf0aAOh8rz+HcMCHffvIShsGCgzzQU0EbpV5Yt4mOnHqVOUU1OPqwTenigghoBKf22zKBp2LVAAZZqEAVv+kJQWXf13d/FwAHZviKSiKrNPmZumlYpNidBeZKjed4NiE9aG8jXsfzNT0u/LkMVINUdQXfcW4kO4LSDnlXFu79lTehVHd1nvELtWmZqnfLIXpx8OuFVv4jSPEN9VtA2K7ni34LI5ImnkTa4zs3FHPOciyvpJhnsvFp7sJ1daXUCWZl25ju8nwMy3uy4RqUT9r1S7EF5ACz4oTydI4OKIxjYZaA5y/aKtzJabVWYCmMce2FurbRsOLlTY+ZQGFzLOMNRyT/enAAEb+XWblm0fq2InsiHbIgaIDQJnZVaADC688s4nJRCxm/T98hJuSbFGpySN2tSEw75pjOVz41t2N5mAW774jkJ/vKfMKm5k0GObs+/CKCYb/HVtcY+9p7RuHyQHr+aCVnU9fLnNO+VI5G8LsVmlMOCcg2K49FUakB0ZI0HD/ti4f0l5aJrQMVKR3XFmh2FN8otJU7cFa2RPfLE4nqEF/+ioIV+vBGyw"