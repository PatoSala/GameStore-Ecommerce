let db = require('../database/models');

const cartController = {
    addToCart: (req, res) => {
        idUser = req.session.userLogged.id;

        db.Cart.findOne({
                where: {
                    id_user: idUser,
                    status: 1,
                }
            })
            .then(function(response) {
                if (response) {
                    let idProduct = req.params.id;

                    db.cartProduct.create({
                        id_cart: response.id,
                        id_product: idProduct,
                    });

                    return res.redirect('/');
                } else {
                    db.Cart.create({
                            id_user: idUser,
                            status: 1,
                        })
                        .then(function(x) {
                            if (x) {
                                let idProduct = req.params.id;

                                db.cartProduct.create({
                                    id_cart: x.id,
                                    id_product: idProduct,
                                })
                            }

                            return res.redirect('/');
                        })
                }
            }).catch(function(error) {
                return res.send(error);
            })

    },

    buyCart: (req, res) => {
        idUser = req.session.userLogged.id;

        db.Cart.update({
                status: 2,
            }, {
                where: {
                    id_user: idUser,
                }
            })
            .then(function(response) {
                return res.render('products/compra', { req });
            })

    },

    removeFromCart: (req, res) => {
        idUser = req.session.userLogged.id;
        idProduct = req.params.id;

        db.cartProduct.destroy({
                where: { id_product: idProduct }
            })
            .then(function(response) {
                res.redirect('/users/cart/' + idUser);
            })
    },
}

module.exports = cartController;