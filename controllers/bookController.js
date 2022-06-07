const db = require('../models');
const Book = db.books;
const Op = db.Sequelize.Op;


// crear nuevo autor
exports.create = (req, res) => {
    // validar la solicitud
    if(!req.body.title) {
        res.status(400). send({
            message: "El contenido no puede estar vacío"
        });
        return
    }

    // crear el book
    const book = {
        title: req.body.title,
        isbn: req.body.isbn,
        publiheddate: req.body.publiheddate,
        totalpages: req.body.totalpages,
        description: req.body.description,
        authorId: req.body.authorId
    }

    // guardar el libro en la base de datos
    Book.create(book)
      .then (data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                err.message || "Ha ocurrido un error al crear el libro"
          })
      })
};

// mostrar todos los libros filtrado por titulo
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: { [Op.like]: `%${title}%`}} : null;
    Book.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Ha ocurrido un error al crear el libro"
            })
        })
}

// buscar libro por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Book.findByPk(id)
     .then(data => {
         if(data){
             res.send(data);
         }else{
             res.status(400). send({
                 message: `No se ha encontrado el libro con clave ${id}`
             })
         }
     })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha ocurrido un error al encontrar el libro" + id
        })
    })
}

// actualizar datos de autor
exports.update = (req, res) => {
    const id = req.params.id;
      Book.update(req.body, { where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "El libro fue actualizado"
                })
            } else {
                res.send({
                    message: "No se ha podido actualizar el registro"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Ha ocurrido un error al actualizar el libro" + id
            })
        })
}

// eliminar datos de autor
exports.delete = (req, res) => {
    const id = req.params.id;
    Book.destroy(req.body, { where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "El libro fue eliminado"
                })
            } else {
                res.send({
                    message: "No se ha podido eliminar el registro"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Ha ocurrido un error al eliminar el libro" + id
            })
        })
}