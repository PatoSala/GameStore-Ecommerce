let db = require('../database/models');

let apiController = {

    users: (req, res) => {

        db.Users.findAll()
            .then(function(response) {
                return res.json(response);
            })
    },

    products: (req, res) => {

        db.Products.findAll()
            .then(function(response) {
                return res.json(response);
            })

    },

};

module.exports = apiController;