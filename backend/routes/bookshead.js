const express = require('express');
const connection = require('../conf');
const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM ec_bookshead', (err, rows, fields) => {
    if (err) {
      res.sendStatus(400)
    };
    res.send(rows);
  });
});

router.get('/:id', (req, res) => {
  connection.query(`SELECT * FROM ec_bookshead 
    WHERE ecb_id = ?`, [req.params.id], (err, rows, fields) => {
    if (err) {
      res.sendStatus(400)
    };
    res.send(rows);
  });
});

router.post('/', (req, res) => {
  const { author, title, subtitle, otherbooks, dedication, quotes, thanks, preface, prologue, foreword, preambule, resume } = req.body;

  connection.query( `INSERT INTO ec_bookshead
    (ecb_author, ecb_title, ecb_subtitle, ecb_otherbooks, ecb_dedication,
    ecb_quotes, ecb_thanks, ecb_preface,ecb_prologue, ecb_foreword, ecb_preambule, ecb_resume)
    VALUES ("${author}", "${title}", "${subtitle}", 
  "${otherbooks}", "${dedication}","${quotes}",
  "${thanks}", "${preface}", "${prologue}",
  "${foreword}", "${preambule}", "${resume}")`,
  (err,rows, fields) => {
    if(err) throw err;
  });
  res.sendStatus(200)
});

// //modification du contenu de bookshead
router.put('/:id',(req, res) => {
  const idBookshead = req.params.id;
  const { author, title, subtitle, otherbooks, dedication, quotes, thanks, preface, prologue, foreword, preambule, resume } = req.body;
  
  connection.query(`UPDATE ec_bookshead 
  SET ecb_author = "${author}", ecb_title = "${title}", ecb_subtitle = "${subtitle}", ecb_otherbooks = "${otherbooks}", ecb_dedication = "${dedication}", ecb_quotes = "${quotes}", ecb_thanks = "${thanks}", ecb_preface = "${preface}", ecb_prologue = "${prologue}", ecb_foreword = "${foreword}", ecb_preambule = "${preambule}", ecb_resume "${resume}"
  WHERE ecb_id = ?`, [idBookshead], (err, rows, fields) => {
    if (err) { res.sendStatus(400) };
    res.send(rows);
  });
});

//suppression du contenu de bookshead
router.delete('/:id',(req, res) => {
  connection.query(`DELETE FROM ec_bookshead WHERE ecb_id = ? `, [req.params.id], (err, rows, fields) => {
    if(err) throw err;
    res.sendStatus(200);
  });
});

module.exports = router;