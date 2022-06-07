module.exports = app => {
    const authors = require('../controllers/authorController');
    var router = require('express').Router();

    // crear rutas
    router.post('/', authors.create); // nuevo autor
    router.get('/', authors.findAll); //todos los autores
    router.get('/:id', authors.findOne); //autor por id
    router.put('/:id', authors.update) // actualizar autor
    router.delete('/:id', authors.delete); // eliminar autor
    router.get('/bauthor/:id', authors.booksByAuthor);

    app.use('/api/author', router);
}