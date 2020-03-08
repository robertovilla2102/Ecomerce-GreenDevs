const { Carrito, Producto } = require("../models/index");

const CarritoController = {};

CarritoController.buscarCarritos = function(req, res) {
  !req.user
    ? CarritoController.carritoDeslogeado(req, res)
    : CarritoController.carritoLogeado(req, res);
};

CarritoController.agregarProducto = function(req, res) {
  if (!req.user) {
    CarritoController.agregarProductoDeslogeado(req, res);
  } else {
    CarritoController.agregarProductoLogeado(req, res);
  }
};

CarritoController.carritoDeslogeado = async function(req, res) {
  req.session.carrito ? res.json(req.session.carrito) : res.json([]);
};

CarritoController.carritoLogeado = function(req, res) {
  Carrito.findAll({
    include: [
      {
        model: Producto
      }
    ],
    where: { userId: req.user.id }
  })
    .then(carritos => res.json(carritos))
    .catch(err => {
      res.status(500).send(err);
    });
};

CarritoController.agregarProductoDeslogeado = function(req, res) {
  let listaCarrito = req.session.carrito || [];
  let productoId = req.params.productId;
  let datos = req.body.body;
  Producto.findOne({ where: { id: productoId } }).then(producto => {
    if (listaCarrito) {
      let posicion = CarritoController.verificarDuplicado(
        listaCarrito,
        productoId
      );
      if (posicion == -1) {
        const nuevoCarrito = {
          ...datos,
          producto
        };
        listaCarrito.push(nuevoCarrito);
      } else {
        let carritoActual = listaCarrito[posicion];
        carritoActual.cantidad += datos.cantidad;
        listaCarrito[posicion] = carritoActual;
      }
    }
    req.session.carrito = listaCarrito;
    res.status(200).json(req.session.carrito);
  });
};

CarritoController.agregarProductoLogeado = function(req, res) {
  let user = req.user || null;
  let productoId = req.params.productId;
  let datos = req.body.body;
  Carrito.findOne({
    where: { userId: user.id, productoId: productoId }
  })
    .then(carritos => {
      if (carritos) {
        Carrito.update(
          { cantidad: carritos.cantidad + datos.cantidad },
          { where: { id: carritos.id } }
        ).then(() => res.sendStatus(201));
      } else {
        Carrito.create({
          ...datos,
          userId: user.id,
          productoId: productoId
        }).then(() => {
          res.sendStatus(200);
        });
      }
    })
    .catch(err => res.json(err));
};

CarritoController.verificarDuplicado = function(listaCarrito, productoId) {
  let posicion = -1;
  for (let i = 0; i < listaCarrito.length; i++) {
    if (listaCarrito[i].producto.id == productoId) {
      posicion = i;
      break;
    }
  }
  return posicion;
};

module.exports = CarritoController;