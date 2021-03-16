const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router();

router.get('/users', apiController.users);

router.get('/products', apiController.products);

module.exports = router;