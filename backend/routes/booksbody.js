const express = require('express');
const connection = require('../conf');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("you're in the body of your book");
});

router.get('/:id', (req, res) => {
  connection.query(`SELECT * FROM ec_booksbody 
    WHERE ecbk_id = ?`, [req.params.id], (err, rows, fields) => {
    if (err) {
      res.sendStatus(400)
    };
    res.send(rows);
  });
});

router.post('/', (req, res) => {
  const { partie, chapter, subchapter, text } = req.body;

  connection.query( `INSERT INTO ec_booksbody
    (ecbk_partie, ecbk_chapter, ecbk_subchapter, ecbk_text)
    VALUES ("${partie}", "${chapter}", "${subchapter}", 
  "${text}")`,
  (err,rows, fields) => {
    if(err) throw err;
  });
  res.sendStatus(200)
});

// //modification du contenu de booksbody
router.put('/:id',(req, res) => {
  const idBooksbody = req.params.id;
  const { partie, chapter, subchapter, text } = req.body;
  
  connection.query(`UPDATE ec_booksbody 
  SET ecbk_partie = "${partie}", ecbk_chapter = "${chapter}", ecbk_subchapter = "${subchapter}", ecbk_text = "${text}"
  WHERE ecbk_id = ?`, [idBooksbody], (err, rows, fields) => {
    if (err) { res.sendStatus(400) };
    res.send(rows);
  });
});

//suppression du contenu de booksbody
router.delete('/:id',(req, res) => {
  connection.query(`DELETE FROM ec_booksbody WHERE ecbk_id = ? `, [req.params.id], (err, rows, fields) => {
    if(err) throw err;
    res.sendStatus(200);
  });
});

module.exports = router;