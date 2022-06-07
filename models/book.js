module.exports =(sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
        title: {
            type: Sequelize.STRING
        },
        isbn: {
            type: Sequelize.STRING
        },
        publisheddata: {
            type: Sequelize.DATEONLY
        },
        totalpages: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Book;
};
