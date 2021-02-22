const fs = require('fs');
let products = JSON.parse(fs.readFileSync(__dirname + '/../database/products.json'));

const indexController = {

    index: (req, res) => {
    res.render("index", {req, products});
    }
    
};

module.exports = indexController;