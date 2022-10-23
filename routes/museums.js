const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation');

const museumsController = require('../controllers/museums');

// gets all museums in collection
router.get('/', museumsController.getAll);

// gets one museum in collection by id
router.get('/:id', museumsController.getOne);

// creates a new museum document
router.post('/', validation.museumValidation, museumsController.createOne);

// updates a museum document identified by id
router.put('/:id', validation.museumValidation, museumsController.updateOne);

// deletes a museum document identified by id
router.delete('/:id', museumsController.deleteOne);

module.exports = router;