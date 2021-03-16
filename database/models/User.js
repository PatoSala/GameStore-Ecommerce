module.exports = function(sequelize, dataTypes) {
    let alias = 'Users';
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        name: {
            type: dataTypes.STRING(100),
        },
        email: {
            type: dataTypes.STRING(100),
        },
        password: {
            type: dataTypes.STRING(100),
        },
        op: {
            type: dataTypes.INTEGER,
        },
    }

    let config = {
        tableName: "users",
        timestamps: false,
    }

    const User = sequelize.define(alias, cols, config);

    return User;
}