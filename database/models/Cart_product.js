module.exports = (sequelize, dataTypes) => {
    let alias = "cartProduct";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
        },

        id_cart: {
            foreignKey: true,
            type: dataTypes.INTEGER,
        },

        id_product: {
            foreignKey: true,
            type: dataTypes.INTEGER,
        },

        cant: {
            type: dataTypes.INTEGER,
        },
    };
    let config = {
        tableName: "cart_product",
        timestamps: false,
    };

    const CartProduct = sequelize.define(alias, cols, config);

    return CartProduct;
}