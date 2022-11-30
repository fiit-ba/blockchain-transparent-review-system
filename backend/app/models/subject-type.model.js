module.exports = (sequelize, DataTypes) => {
    return sequelize.define("subject_type", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        used_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'subject_type'
    });
};
