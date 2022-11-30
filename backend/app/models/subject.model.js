module.exports = (sequelize, DataTypes) => {
    return sequelize.define("subject", {
        name: {
            type: DataTypes.STRING
        },
        full_name: {
            type: DataTypes.STRING
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        used_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'subject'
    });
};
