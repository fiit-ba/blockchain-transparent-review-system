const dbConfig = require("../config/db.config.js");
const dbUtils = require("../utils/db.utils");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// -------- Subject Tables --------
const StudyLevel = require("./study-level.model")(sequelize, DataTypes);
const SubjectType = require("./subject-type.model")(sequelize, DataTypes);
const Subject = require("./subject.model.js")(sequelize, DataTypes);

// Subject Relations
Subject.belongsTo(StudyLevel, {
    foreignKey: {
        name: 'study_level_id',
        allowNull: false
    },
});
Subject.belongsTo(SubjectType, {
    foreignKey: {
        name: 'subject_type_id',
        allowNull: false
    },
});

const User = require("./user.model")(sequelize, DataTypes);

// Data Insert
(async () => {
    await sequelize.sync({ force: true });
    const jsonPath = 'assets/data/db-insert/';

    // Subject data
    dbUtils.bulkCreateFromJSON(StudyLevel, jsonPath + 'study-level.json');
    dbUtils.bulkCreateFromJSON(SubjectType, jsonPath + 'subject-type.json');
    dbUtils.bulkCreateFromJSON(Subject, jsonPath + 'subject.json');
    // Users
    dbUtils.bulkCreateFromJSON(User, jsonPath + 'user.json')
})();

db.study_level = StudyLevel;
db.subject_type = SubjectType;
db.subject = Subject;
db.user = User;

module.exports = db;
