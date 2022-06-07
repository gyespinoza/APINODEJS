const db = require('../models');
const Author = db.authors;
const Op = db.Sequelize.Op;


// crear nuevo autor
exports.create = (req, res) => {
    // validar la solicitud
    if(!req.body.firstname) {
        res.status(400). send({
            message: "El contenido no puede estar vacío"
        });
        return
    }

    // crear el autor
    const author = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    // guardar el autor en la base de datos
    Author.create(author)
      .then (data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                err.message || "Ha ocurrido un error al crear el autor"
          })
      })
};

// mostrar todos los autores filtrado por nombre
exports.findAll = (req, res) => {
    const firstname = req.query.firstname;
    var condition = firstname ? {firstname: { [Op.like]: `%${firstname}%`}} : null;
    Author.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Ha ocurrido un error al crear el autor"
            })
        })
}

// buscar author por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Author.findByPk(id)
     .then(data => {
         if(data){
             res.send(data);
         }else{
             res.status(400). send({
                 message: `No se ha encontrado el autor con clave ${id}`
             })
         }
     })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha ocurrido un error al encontrar el autor" + id
        })
    })
}

// actualizar datos de autor
exports.update = (req, res) => {
    const id = req.params.id;
    Author.update(req.body, { where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "El autor fue actualizado"
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
                  err.message || "Ha ocurrido un error al actualizar el autor" + id
            })
        })
}

// eliminar datos de autor
exports.delete = (req, res) => {
    const id = req.params.id;
    Author.destroy(req.body, { where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "El autor fue eliminado"
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
                  err.message || "Ha ocurrido un error al eliminar el autor" + id
            })
        })
}


// libros por autor
exports.booksByAuthor = (req, res) => {
    const id = req.params.id;
    Author.findByPk(id, { include: ["books"]})
     .then(data => {
         if(data){
             res.send(data);
         }else{
             res.status(400). send({
                 message: `No se ha encontrado el autor con clave ${id}`
             })
         }
     })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha ocurrido un error al encontrar el autor" + id
        })
    })
}