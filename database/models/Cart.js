module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
        },

        id_user: {
            foreignKey: true,
            type: dataTypes.INTEGER,
        },

        status: {
            type: dataTypes.INTEGER,
        }
    }

    let config = {
        tableName: "cart",
        timestamps: false,
    }

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models) {
        Cart.belongsToMany(models.Products, {
            as: 'productos',
            through: 'cartProduct',
            foreignKey: "id_cart",
            otherKey: 'id_product',
            timestamps: false,
        });

        Cart.belongsTo(models.Users, {
            foreignKey: "id_user"
        })
    }

    return Cart;
}