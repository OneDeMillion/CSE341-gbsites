const express = require('express');
const router = express.Router();

const museumsController = require('../controllers/museums');

// gets all museums in collection
router.get('/', museumsController.getAll);

// gets one museum in collection by id
router.get('/:id', museumsController.getOne);

// creates a new museum document
router.post('/', museumsController.createOne);

// updates a museum document identified by id
router.post('/:id', museumsController.updateOne);

// deletes a museum document identified by id
router.delete('/:id', museumsController.deleteOne);

module.exports = router;