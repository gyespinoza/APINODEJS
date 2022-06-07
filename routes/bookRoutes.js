module.exports = app => {
    const books = require('../controllers/bookController');
    var router = require('express').Router();

    // crear rutas
    router.post('/', books.create); // nuevo libro
    router.get('/', books.findAll); //todos los libros
    router.get('/:id', books.findOne); //libro por id
    router.put('/:id', books.update) // actualizar libro
    router.delete('/:id', books.delete); // eliminar libro

    app.use('/api/book', router);
}