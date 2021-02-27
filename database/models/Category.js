

module.exports = (sequelize, dataTypes) => {
    let alias = "Categories";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        name: {
            type: dataTypes.STRING(100),
        },
        
    };

    let config = {
        tableName: "categories",
        timestamps: false,
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
        Category.hasMany(models.Products, {
            as:"products",
            foreignKey: "category_id",
        })
    }

    return Category;
}

