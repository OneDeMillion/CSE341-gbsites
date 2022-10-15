const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('A castle to visit');
});

module.exports = router;