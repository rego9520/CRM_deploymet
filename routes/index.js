const express = require("express");
const router = express.Router();

const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");

//middleware para proteger rutas
const auth = require("../middleware/auth");

module.exports = function () {
  //agg nuevo clientes via post
  router.post("/clientes", auth, clienteController.nuevoCliente);

  //obtener todos los clientes
  router.get("/clientes", auth, clienteController.mostrarClientes);

  //muestra un solo cloente por id
  router.get("/clientes/:idCliente", auth, clienteController.mostrarCliente);

  //actualizar cliente
  router.put("/clientes/:idCliente", auth, clienteController.actualizarCliente);

  //eliminar cliente
  router.delete(
    "/clientes/:idCliente",
    auth,
    clienteController.eliminarCliente
  );

  /** Productos **/
  router.post(
    "/productos",
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  //muestra todos los productos
  router.get("/productos", auth, productosController.mostratProductos);
  //muestra product por id
  router.get(
    "/productos/:idProducto",
    auth,
    productosController.mostrarProducto
  );
  //busqueda de productos
  router.post(
    "/productos/busqueda/:query",
    auth,
    productosController.buscarProducto
  );

  //actualiza producto
  router.put(
    "/productos/:idProducto",
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );
  router.delete(
    "/productos/:idProducto",
    auth,
    productosController.eliminarProducto
  );

  /** Pedidos **/
  //nuevo pedido
  router.post("/pedidos/nuevo/:idUsuario", auth, pedidosController.nuevoPedido);
  router.post("/pedidos", auth, pedidosController.nuevoPedido);
  //mostrar pedidos
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);
  router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  //Usuarios
  router.post("/crear-cuenta", auth, usuariosController.registrarUsuario);
  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);
  return router;
};
