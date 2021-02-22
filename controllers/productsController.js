const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
let products = JSON.parse(fs.readFileSync(__dirname + '/../database/products.json'));

const productsController = {

    index: (req, res) => {
        res.render('products/productsIndex', {products});
    },

    list: (req, res) => {
    res.render('products/productsList.ejs', {products});
    },

    show: (req, res) => {
        let idProduct = req.params.id;
        console.log(idProduct);
        let productFound;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idProduct) {
                productFound = products[i];
                console.log(productFound);
                break;
            }
        }

        if (productFound) {
            res.render('products/viewProduct', {productFound});
        } else {
            res.send('Producto no encontrado');
        }

        console.log(productFound);
    },

    create: (req, res) => {
    res.render('products/addProduct');
    },

    store: (req, res) => {
        let newProduct = {};
            newProduct.id = uuidv4();
            newProduct.name = req.body.name;
            newProduct.price = req.body.price;
            newProduct.cat = req.body.cat;
            newProduct.desc = req.body.desc;
        products.push(newProduct);
        productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + '/../database/products.json', productsJSON);
        res.redirect('/products/list');
    },

    edit: (req, res) => {
        let idProduct = req.params.id;
        console.log(idProduct);
        let productFound;
        
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idProduct) {
                console.log(products[i].id);
                console.log(idProduct);
                productFound = products[i];
                break;
            }
        }

        if (productFound) {
            res.render('products/editProduct', {productFound});
        } else {
            res.send('Producto no encontrado');
        }

        console.log(productFound);
    },

    update: (req, res) => {
        let idProduct = req.params.id;

        let editProduct = products.map(function(product) {
            if (product.id == idProduct) {
                let productEdit = req.body;
                productEdit.id = idProduct;
                console.log(productEdit);
                return productEdit;
            }
            return product;
        });
        editProductJSON = JSON.stringify(editProduct);
        fs.writeFileSync(__dirname + '/../database/products.json', editProductJSON);
        res.send('Producto editado');
    },

    delete: (req, res) => {
        let idProduct = req.params.id;
        console.log(idProduct);

        let deleteProduct = products.filter(function(product) {
            return product.id != idProduct;
        });

        console.log(deleteProduct);

        deleteProductJSON = JSON.stringify(deleteProduct);
        fs.writeFileSync(__dirname + '/../database/products.json', deleteProductJSON);
        console.log(deleteProductJSON);
        res.send('producto eliminado');
    },

};

module.exports = productsController;