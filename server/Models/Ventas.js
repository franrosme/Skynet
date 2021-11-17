const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  nombreVenta: {
    type: String,
    required: true,
  },
  precioVenta: {
    type: Number,
    required: true,
  },
  cantidadVenta: {
    type: Number,
    required: true,
  },
  fechaVenta: {
    type: String,
    required: true,
  },
  idClienteVenta: {
    type: Number,
    required: true,
  },
  nombreClienteVenta: {
    type: String,
    required: true,
  },
  idVendedorVenta: {
    type: Number,
    required: true,
  },
  estadoVenta: {
    type: String,
    required: true,
  },
});

const Venta = mongoose.model("Venta", VentaSchema);
module.exports = Venta;
