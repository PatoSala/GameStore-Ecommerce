const fs = require('fs');
const { getMaxListeners } = require('process');
let db = require('../database/models');

const indexController = {

    index: (req, res) => {
        db.Products.findAll()
            .then(function(products) {
                return res.render("index", { req, products });
            });

    },

    prueba: (req, res) => {
        /* db.Products.findByPk(5)
             .then(function(products) {
                 return res.json(products);
             }) */

        /* idUser = req.session.userLogged.id;
         db.Cart.findOne({
                 where: {
                     id_user: idUser,
                     status: 1,
                 }
             })
             .then(function(response) {
                 if (response) {
                     return res.json(response);
                 } else {
                     return res.send('no hay carrito');
                 }
             }).catch(function(error) {
                 return res.send(error)
             }); */

        idUser = req.session.userLogged.id;
        userCart = db.Cart.findOne({
                where: {
                    id_user: idUser,
                    status: 1,
                }
            })
            .then(function(cart) {
                return res.json(cart);
            })

        /* db.Products.update({
             name: "celular2",
             price: 67000,
             description: "otro celular",
             category_id: 1
         }, {
             where: {
                 id: 11,
             }
         }).then(function(producto) {
             db.Products.findAll()
                 .then(function(x) {
                     return res.json(x);
                 })
         }) */

        /* db.Products.destroy({
            where: {
                id: 1,
            }
        }).then(function(x) {
            if (x) {
                return res.send("eliminado");
            } else {
                return res.send('no se elimino');
            }
        }).catch(function(error) {
            return error;
        }) */

        /* db.Users.findAll()
            .then(function(user) {
                if (user) {
                    return res.json(user);
                } else {
                    return res.send('error');
                }
            }).catch(function(error) {
                return error;
            }) */



        /* db.Products.findAll()
            .then(function(products) {
                return res.json(products);
            }) */

        /* db.Products.create({
            name: "celular",
            price: 60.000,
            description: "iphone 7",
            category_id: 2,

        }).then(function(x) {
            if (x) {
                return res.send("se creo");
            } else {
                return res.send("error");
            }
        }).catch(function(error) {
            return res.send(error);
        }) */

        /* db.Categories.create({
            name: 'Componentes',
        }).then(function(x) {
            if (x) {
                return res.json(x);
            } else {
                return res.send('error');
            }
        }).catch(function(error) {
            return res.send(error);
        }) */


    }

};

module.exports = indexController;