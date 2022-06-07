module.exports= (sequelize, Sequelize) => {
    const Author = sequelize.define("author", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        }
    })
    return Author;
};

