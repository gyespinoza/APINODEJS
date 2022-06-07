const dbConfig = require('../db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.authors = require('./author.js')(sequelize, Sequelize);
db.books = require('./book.js')(sequelize, Sequelize);

// relaciones entre tablas
db.authors.hasMany(db.books, {as: "books"});
db.books.belongsTo(db.authors, {
    foreignKey: "authorId",
    as: "author"
});

module.exports = db;
