const express = require('express');
const router = express.Router();

router.use('/museums', require('./museums'));
router.use('/castles', require('./castles'));

module.exports = router;

