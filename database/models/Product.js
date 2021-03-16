module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        name: {
            type: dataTypes.STRING(100),
        },
        price: {
            type: dataTypes.INTEGER,
        },
        description: {
            type: dataTypes.STRING(100),
        },
        category_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
        },
        image: {
            type: dataTypes.STRING(100),
        }
    };

    let config = {
        tableName: "products",
        timestamps: false,
    };

    const Product = sequelize.define(alias, cols, config);
    Product.associate = function(models) {
        Product.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "category_id",
        });
        Product.belongsToMany(models.Cart, {
            as: 'carritos',
            through: 'cartProduct',
            foreignKey: "id_product",
            otherKey: 'id_cart',
            timestamps: false,
        });
    }
    return Product;
}