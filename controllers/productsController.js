const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const db = require('../database/models');
const multer = require('multer');
const { pathToFileURL } = require('url');
let path = require('path');
const { check, validationResult } = require('express-validator/check');
//let products = JSON.parse(fs.readFileSync(__dirname + '/../database/products.json'));

const productsController = {

    index: (req, res) => {

        db.Products.findAll()
            .then(function(allProducts) {
                let products = allProducts;
                console.log(products);
                res.render('products/productsIndex.ejs', { products, req });
            })

    },

    indexCat: (req, res) => {
        let categoryId = req.params.id;
        console.log(categoryId);

        db.Products.findAll({
                where: {
                    category_id: categoryId,
                }
            })
            .then(function(categoryProduct) {
                let products = categoryProduct;
                res.render('products/productsIndex.ejs', { products, req });
            })
    },

    list: (req, res) => {

        db.Products.findAll()
            .then(function(allProducts) {
                let products = allProducts;
                res.render('products/productsList.ejs', { products, req });
            })

    },

    show: (req, res) => {
        let idProduct = req.params.id;
        console.log(idProduct);


        /* for (let i = 0; i < products.length; i++) {
            if (products[i].id == idProduct) {
                productFound = products[i];
                console.log(productFound);
                break;
            }
        } */

        db.Products.findOne({
                where: {
                    id: idProduct,
                }
            })
            .then(function(productFound) {
                if (productFound) {
                    return res.render('products/viewProduct', { productFound, req });
                } else {
                    return res.send('Producto no encontrado');
                }
            })

    },

    create: (req, res) => {
        res.render('products/addProduct', { req });
    },

    store: (req, res, next) => {
        let newProduct = {};
        newProduct.name = req.body.name;
        newProduct.price = req.body.price;
        newProduct.category_id = req.body.cat;
        newProduct.description = req.body.desc;
        newProduct.image = req.files[0].filename;

        console.log(req.files);


        db.Products.create(newProduct)
            .then(function(product) {
                return res.redirect('/products/list');
            }).catch(function(error) {
                return res.send(error);
            })

        /* products.push(newProduct);
        productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + '/../database/products.json', productsJSON); */


    },

    edit: (req, res) => {
        let idProduct = req.params.id;

        db.Products.findOne({
                where: {
                    id: idProduct,
                }
            })
            .then(function(productFound) {
                return res.render('products/editProduct', { productFound, req });
            })
    },

    update: (req, res) => {
        /* let errors = validationResult(req);

        if (errors.isEmpty()) { */
        let idProduct = req.params.id;
        let editProduct = {};
        editProduct.name = req.body.name;
        editProduct.price = req.body.price;
        editProduct.category_id = req.body.cat;
        editProduct.description = req.body.desc;
        editProduct.image = req.files[0].filename;


        db.Products.update(editProduct, {
                where: {
                    id: idProduct,
                }
            }).then(function(producto) {
                return res.redirect('/products/list');
            })
            /* } else {
                let idProduct = req.params.id;

                db.Products.findOne({
                        where: {
                            id: idProduct,
                        }
                    })
                    .then(function(productFound) {
                        return res.render('products/editProduct', { errors: errors.errors, req, productFound });
                    })


            } */
    },

    delete: (req, res) => {
        let idProduct = req.params.id;

        db.Products.destroy({
                where: {
                    id: idProduct,
                }
            })
            .then(function(x) {
                if (x) {
                    res.redirect('/products/list');
                }
            })
    },

};

module.exports = productsController;