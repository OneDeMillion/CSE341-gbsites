const express = require('express');
const router = express.Router();

const castlesController = require('../controllers/castles');

// gets all castles in collection
router.get('/', castlesController.getAll);

// gets one castle in collection by id
router.get('/:id', castlesController.getOne);

// creates a new castle document
router.post('/', castlesController.createOne);

// updates a castle document identified by id
router.post('/:id', castlesController.updateOne);

// deletes a castle document identified by id
router.delete('/:id', castlesController.deleteOne);



module.exports = router;