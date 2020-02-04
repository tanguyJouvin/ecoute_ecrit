const express = require('express');
const connection = require('../conf');
const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM ec_booksbody', (err, result) => {
    if (err) {
      res.sendStatus(400)
    };
    res.send(result);
  });
});

router.get('/:id', (req, res) => {
  connection.query(`SELECT * FROM ec_booksbody 
    WHERE ec_id = ${req.params.id}`, (err, result) => {
    if (err) {
      res.sendStatus(400)
    };
    res.send(result);
  });
});

router.post('/', (req, res) => {
  connection.query( `INSERT INTO ec_booksbody 
  (ecb_author, ecb_title, ecb_subtitle, ecb_otherbooks, ecb_dedication, 
    ecb_quotes, ecb_thanks, ecb_preface,ecb_prologue, ecb_foreword, ecb_preambule, ecb_resume)
  VALUES ("${req.body.author}", "${req.body.title}", "${req.body.subtitle}",
  "${req.body.otherbooks}", "${req.body.dedication}", "${req.body.quotes}",
  "${req.body.thanks}", "${req.body.preface}", "${req.body.prologue}",
  "${req.body.foreword}", "${req.body.preambule}", "${req.body.resume}")`,
  (err,result) => {
    if(err) throw err;
  });
  res.sendStatus(200)
});

// //modification du contenu de booksbody
router.put('/:id',(req, res) => {
  const idBooksbody = req.params.id;
  
  connection.query(`UPDATE ec_booksbody 
  SET ecb_author = "${req.body.author}", ecb_title = "${req.body.title}", ecb_subtitle = "${req.body.subtitle}", ecb_otherbooks = "${req.body.otherbooks}", ecb_dedication = "${req.body.dedication}", ecb_quotes = "${req.body.quotes}", ecb_thanks = "${req.body.thanks}", ecb_preface = "${req.body.preface}", ecb_prologue = "${req.body.prologue}", ecb_foreword = "${req.body.foreword}", ecb_preambule = "${req.body.preambule}", ecb_resume "${req.body.resume}"
  WHERE ec_id = ?`, [idBooksbody], (err, result) => {
    if(err) throw err;
    res.sendStatus(200)
  });
});

//suppression du contenu de booksbody
router.delete('/:id',(req, res) => {
  connection.query(`DELETE FROM ec_booksbody WHERE ec_id = ${req.params.id}`, (err, result) => {
    if(err) throw err;
    res.sendStatus(200);
  });
});

module.exports = router;