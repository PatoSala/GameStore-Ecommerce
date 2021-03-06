const express = require('express');
const router = express.Router(); 
const { check, validationResult, body } = require('express-validator');
const path = require('path');
const multer = require('multer');
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'tmp/my-uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

let upload = multer({storage: storage});



//requerimos el controlador correspondiente a el recurso
const productsController = require("../controllers/productsController.js");
const authMiddlewere = require('../middlewares/authMiddleware');
const opMiddlewere = require('../middlewares/opMiddlewere.js');

//definimos con propiedad del controlador 
router.get('/list', authMiddlewere, opMiddlewere, productsController.list);

router.get('/index', productsController.index);

router.get('/show/:id', productsController.show);

router.get('/create', productsController.create);
router.post('/create', [
    check('name').isLength( {min: 5} ).withMessage("Ponele un nombre a tu producto"),
    check('price').isInt(),
], 
upload.any(), productsController.store);

router.get('/edit/:id', productsController.edit);
router.post('/edit/:id', productsController.update);

router.post('/delete/:id', productsController.delete);

module.exports = router;