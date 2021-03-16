const db = require("../database/models");

function cookieAuthMiddlewere(req, res, next) {
    next();

    if (req.cookies.remember != undefined && req.session.userLogged == undefined) {

        db.Users.findOne({
                where: {
                    email: req.cookie.remember.email,
                }
            })
            .then(function(response) {
                req.session.userLogged = response;
            })
    }
}

module.exports = cookieAuthMiddlewere;