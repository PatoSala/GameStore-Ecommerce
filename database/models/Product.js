

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
    };

    let config = {
        tableName: "products",
        timestamps: false,
    };

    const Product = sequelize.define(alias, cols, config);
    Product.associate = function(models) {
        Product.belongsTo(models.Categories, {
            as:"categories",
            foreignKey: "category_id",
        })
    }
    return Product;
}

