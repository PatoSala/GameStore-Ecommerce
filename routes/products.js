const express = require('express');
const router = express.Router(); 
const { check, validationResult, body } = require('express-validator');

//requerimos el controlador correspondiente a el recurso
const productsController = require("../controllers/productsController.js");
const opMiddlewere = require('../middlewares/opMiddlewere.js');

//definimos con propiedad del controlador 
router.get('/list', opMiddlewere, productsController.list);

router.get('/index', productsController.index);

router.get('/show/:id', productsController.show);

router.get('/create', productsController.create);
router.post('/create', [
    check('name').isLength( {min: 5} ).withMessage("Ponele un nombre a tu producto"),
    check('price').isInt(),
], productsController.store);

router.get('/edit/:id', productsController.edit);
router.post('/edit/:id', productsController.update);

router.post('/delete/:id', productsController.delete);

module.exports = router;