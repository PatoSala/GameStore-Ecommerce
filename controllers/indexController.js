const fs = require('fs');
let products = JSON.parse(fs.readFileSync(__dirname + '/../database/products.json'));
let db = require('../database/models'); 

const indexController = {

    index: (req, res) => {
    res.render("index", {req, products});
    },

    prueba: (req, res) => {
        db.Products.findAll({
                include: [{
                    association: 'categories',
                    where: {
                        name: 'Perifericos',
                    }
                }],
        })
            .then(products => {
                res.send(products);
            }) 
     },
    
};

module.exports = indexController;