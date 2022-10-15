const express = require('express');
const router = express.Router();
const openCors = require('../middleware/openCors');

router.use(openCors);

router.use('/museums', require('./museums'));
router.use('/castles', require('./castles'));
router.use('/api-docs', require('./docs'));

module.exports = router;

