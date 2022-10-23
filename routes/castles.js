const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation');


const castlesController = require('../controllers/castles');

// gets all castles in collection
router.get('/', castlesController.getAll);

// gets one castle in collection by id
router.get('/:id', castlesController.getOne);

// creates a new castle document
router.post('/', validation.castleValidation, castlesController.createOne);

// updates a castle document identified by id
router.put('/:id', validation.castleValidation, castlesController.updateOne);

// deletes a castle document identified by id
router.delete('/:id', castlesController.deleteOne);


module.exports = router;