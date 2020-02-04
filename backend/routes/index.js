const express = require('express');
const register = require('./register');
const login = require('./login');
const bookshead = require('./bookshead');
const booksbody = require('./booksbody');

const router = express.Router();

router.use('/register', register);
router.use('/login', login);

router.use('/bookshead', bookshead);
router.use('/booksbody', booksbody);

module.exports = router;