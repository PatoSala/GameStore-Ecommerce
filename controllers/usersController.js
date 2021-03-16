const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const fs = require('fs');
const db = require('../database/models');
const { validationResult } = require('express-validator');
/* let users = JSON.parse(fs.readFileSync(__dirname + '/../database/users.json')); */
let carts = JSON.parse(fs.readFileSync(__dirname + '/../database/cart.json'));


const usersController = {

    list: (req, res) => {
        db.Users.findAll()
            .then(function(users) {
                if (users) {
                    return res.render('users/usersList.ejs', { users, req });
                }
            })
    },

    create: (req, res) => {
        res.render('users/addUser');
    },

    store: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let newUser = {};

            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = bcrypt.hashSync(req.body.password, 10);
            newUser.op = 0;

            db.Users.create(newUser);
            res.redirect('/users/login');

            /* 
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email == req.body.email) {
                        res.render('users/addUser', {errors: errors.errors})
                    }
                } 
            */

            /* let newUser = {};
            let newCart = {};

            newUser.id = uuidv4();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = bcrypt.hashSync(req.body.password, 10);
            newUser.op = 0;

            newCart.id = uuidv4();
            newUser.cart = newCart.id;
            newCart.owner = newUser.id;
            newCart.products = [];
            carts.push(newCart);
            cartJSON = JSON.stringify(carts);
            fs.writeFileSync(__dirname + '/../database/cart.json', cartJSON);

            users.push(newUser);
            usersJSON = JSON.stringify(users);
            fs.writeFileSync(__dirname + '/../database/users.json', usersJSON);
            res.redirect('/users/login');

                */

        } else {
            res.render('users/addUser', { errors: errors.errors });
        }


    },

    edit: (req, res) => {
        let idUser = req.params.id;
        console.log(idUser);

        db.Users.findOne({
                where: {
                    id: idUser,
                }
            })
            .then(function(user) {
                if (user) {
                    res.render('users/editUser', { user, req });
                } else {
                    res.send('Usuario no encontrado!');
                }
            })
    },

    update: (req, res) => {
        let idUser = req.params.id;
        let userUpdate = {};
        userUpdate.name = req.body.name;
        userUpdate.email = req.body.email;

        db.Users.update(
            userUpdate, {
                where: {
                    id: idUser,
                }
            });

        res.redirect('/');
    },

    delete: (req, res) => {
        let idUser = req.params.id;

        db.Users.destroy({
                where: {
                    id: idUser,
                }
            })
            .then(function(x) {
                if (x) {
                    res.redirect('/');
                }
            })
    },

    loginForm: (req, res) => {
        res.render('users/login');
    },

    login: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Users.findOne({
                    where: {
                        email: req.body.email,
                    }
                })
                .then(function(user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        req.session.userLogged = user;

                        if (req.body.checbox != undefined) {
                            res.cookie('remember', user.email, {
                                maxAge: 60000
                            })
                        }

                        return res.redirect('/');
                    } else {
                        return res.render('users/login', { errors: errors.errors });
                    }
                });

        } else {
            res.render('users/login', { errors: errors.errors });
        }

    },

    cart: (req, res) => {
        idUser = req.session.userLogged.id;

        db.Products.findAll({
                include: [{
                    association: 'carritos',
                    where: {
                        id_user: idUser,
                        status: 1,
                    }
                }]
            })
            .then(function(userCart) {
                let totalPrice = 0;
                for (let i = 0; i < userCart.length; i++) {
                    totalPrice = totalPrice + userCart[i].price
                }
                return res.render('users/productCart', { req, userCart, totalPrice })
            })
    },

    show: (req, res) => {
        res.render('users/profile', { req });
    },

    logOut: (req, res) => {
        req.session.userLogged = undefined;
        res.redirect('/');
    },
};

module.exports = usersController;